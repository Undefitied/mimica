import type { Rule, Linter } from 'eslint';
export declare const rules: Record<string, Rule.RuleModule>;
export declare const configs: {
    recommended: Linter.FlatConfig<Linter.RulesRecord> & {
        rules: Linter.RulesRecord;
    };
    'recommended-legacy': Linter.Config<Linter.RulesRecord, Linter.RulesRecord>;
};
export declare const meta: {
    name: string | undefined;
    version: string | undefined;
};
declare const _default: {
    rules: Record<string, Rule.RuleModule>;
    configs: {
        recommended: Linter.FlatConfig<Linter.RulesRecord> & {
            rules: Linter.RulesRecord;
        };
        'recommended-legacy': Linter.Config<Linter.RulesRecord, Linter.RulesRecord>;
    };
    meta: {
        name: string | undefined;
        version: string | undefined;
    };
};
export default _default;
