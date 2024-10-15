/* eslint-disable eslint-comments/no-use */
/*
eslint import/no-extraneous-dependencies: [2, {
  devDependencies: true,
  optionalDependencies: false,
  peerDependencies: false,
}]
*/

import { readFileSync } from 'node:fs';

import { type PluginOption, defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint';
import react from '@vitejs/plugin-react';

function setEnv(mode: string) {
  Object.assign(
    process.env,
    loadEnv(mode, '.', ['REACT_APP_', 'NODE_ENV', 'PUBLIC_URL']),
  );
  process.env.NODE_ENV ||= mode;
  const { homepage } = JSON.parse(readFileSync('package.json', 'utf8'));
  process.env.PUBLIC_URL ||= homepage
    ? `${
        homepage.startsWith('http') || homepage.startsWith('/')
          ? homepage
          : `/${homepage}`
      }`.replace(/\/$/, '')
    : '';
}

function envPlugin(): PluginOption {
  return {
    name: 'env-plugin',
    config(_, { mode }) {
      const env = loadEnv(mode, '.', ['REACT_APP_', 'NODE_ENV', 'PUBLIC_URL']);
      return {
        define: Object.fromEntries(
          Object.entries(env).map(([key, value]) => [
            `process.env.${key}`,
            JSON.stringify(value),
          ]),
        ),
      };
    },
  };
}

function htmlPlugin(mode: string): PluginOption {
  const env = loadEnv(mode, '.', ['REACT_APP_', 'NODE_ENV', 'PUBLIC_URL']);
  return {
    name: 'html-plugin',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replaceAll(/%(.*?)%/g, (match, p1) => env[p1] ?? match);
      },
    },
  };
}

export default defineConfig(({ mode }) => {
  setEnv(mode);
  return {
    plugins: [
      react(),
      envPlugin(),
      htmlPlugin(mode),
      {
        ...checker({
          overlay: false,
          typescript: true,
        }),
        apply: 'serve',
        enforce: 'post',
      },
      mode !== 'test' && {
        ...eslint({
          failOnWarning: false,
          failOnError: false,
          include: ['src/**/*.{js,jsx,ts,tsx}'],
          exclude: ['node_modules'],
        }),
        apply: 'serve',
        enforce: 'post',
      },
    ],
  };
});
