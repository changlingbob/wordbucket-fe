import * as React from 'react';
import { createRoot } from 'react-dom/client';

import 'normalize.css';

import { App } from './App';

import './styles/theme.scss';

const container = document.getElementById('root');
if (!container) {
  throw new Error('missing root');
}

const root = createRoot(container);

async function init() {
  root.render(<App />);
}

init();
