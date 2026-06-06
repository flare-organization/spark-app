import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ComponentsPage from './pages/ComponentsPage'
import BundlesPage from './pages/BundlesPage'
import BundlesCreatePage from './pages/BundlesCreatePage'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
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
