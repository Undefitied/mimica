import { createRoot } from 'react-dom/client';

import App from './App';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('app')!;
const root = createRoot(container);
root.render(<App />);
