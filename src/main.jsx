import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './Router/Router.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
