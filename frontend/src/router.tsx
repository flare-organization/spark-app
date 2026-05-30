import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ComponentsPage from './pages/ComponentsPage'
import LoginPage from '@/pages/LoginPage.tsx'
import SignupPage from '@/pages/SignupPage.tsx'
import BundlesPage from './pages/BundlesPage'
import BundlesCreatePage from './pages/BundlesCreatePage'

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
        path: '/signup',
        element: <SignupPage />,
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
