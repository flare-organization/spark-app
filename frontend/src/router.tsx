import LoginPage from '@/pages/LoginPage.tsx'
import SignupPage from '@/pages/SignupPage.tsx'
import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './layouts/root-layout'
import ComponentsPage from './pages/ComponentsPage'
import HomePage from './pages/HomePage'

import BundlesCreatePage from './pages/BundlesCreatePage'
import {ProtectedRoute} from "@/components/ProtectedRoute.tsx";

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
                element: <ProtectedRoute />,
                children: [
                    {
                        path: 'bundles/create',
                        element: <BundlesCreatePage />,
                    },
                ]
            },
            {
                path: '/login',
                element: <LoginPage />,
            },
            {
                path: '/signup',
                element: <SignupPage />,
            },
        ],
    },
])
