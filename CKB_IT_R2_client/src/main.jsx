import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import FirstPage from './pages/FirstPage.jsx';
import GameRules from './pages/Rules.jsx';
import Round2 from './pages/Round2.jsx';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import LoginForm from './pages/admin/Login.jsx';
import AdminPage from './pages/admin/AdminPage.jsx';
import ThankYouPage from './pages/ThankYou.jsx';
import { MantineProvider } from '@mantine/core';


const router = createBrowserRouter([
  { path: "/", element: <FirstPage /> },
  {path:"/gameRules",element:<GameRules/>},
  {path:"/round2",element:<Round2/>},
  {path:"/login",element:<LoginForm/>},
  {path:"/admin",element:<AdminPage/>},
   {path:"/thanku",element:<ThankYouPage/>}
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider>
    <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>
)
