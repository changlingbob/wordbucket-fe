import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from '@pages/home';

import { AppProvider } from './appProvider';

import './styles/theme.scss';

export const App: React.FC = () => (
  <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </AppProvider>
);
