import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { authRouter } from './auth';

export const router = createBrowserRouter([
    ...authRouter,
    {
      path: "/",
      element: <div>Hello world!</div>,
    }
  ]);
