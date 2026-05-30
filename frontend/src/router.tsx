import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ComponentsPage from './pages/ComponentsPage'
import LoginPage from "@/pages/LoginPage.tsx";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
    {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/components',
    element: <ComponentsPage />,
  },
])