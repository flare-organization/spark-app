import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './layouts/root-layout'
import HomePage from './pages/HomePage'
import ComponentsPage from './pages/ComponentsPage'
import BundlesCreatePage from './pages/BundlesCreatePage'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'components',
                element: <ComponentsPage />,
            },
            {
                path: 'bundles/create',
                element: <BundlesCreatePage />,
            },
        ],
    },
])
