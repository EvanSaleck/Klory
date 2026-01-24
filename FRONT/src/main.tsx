import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/global.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './routes/login';
import Signup from './routes/signup';
import Dashboard from './routes/dashboard';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

