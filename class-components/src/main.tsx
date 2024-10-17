import ReactDOM from 'react-dom/client';
import './styles/index.css';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>,
);
