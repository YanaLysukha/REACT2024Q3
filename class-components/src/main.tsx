import ReactDOM from 'react-dom/client';
import './styles/index.css';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { ThemeProvider } from './context/themeProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ThemeProvider>
  </React.StrictMode>,
);
