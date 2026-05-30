import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ComponentsPage from './pages/ComponentsPage'
import BundlesPage from './pages/BundlesPage'
import BundlesCreatePage from './pages/BundlesCreatePage'
import LoginPage from '@/pages/LoginPage.tsx'

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
    {
        path: '/bundles',
        element: <BundlesPage />,
    },
    {
        path: '/bundles/create',
        element: <BundlesCreatePage />,
    },
])
