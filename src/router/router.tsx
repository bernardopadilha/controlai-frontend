import AuthLayout from '@/layouts/auth-layout'
import RootLayout from '@/layouts/root-layout'
import SignInPage from '@/pages/auth/sign-in-page'
import SignUpPage from '@/pages/auth/sign-up-page'
import CategoriesPage from '@/pages/dashboard/categories-page'
import DashboardPage from '@/pages/dashboard/dashboard-page'
import ExpensesPage from '@/pages/dashboard/expenses-page'
import NotFoundPage from '@/pages/not-found-page'
import { createBrowserRouter } from 'react-router-dom'
import { ProtectRoute } from './middleware/protect-route'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectRoute isProtected>
        <RootLayout />
      </ProtectRoute>
    ),
    children: [
      {
        path: '/',
        element: <DashboardPage />,
      },
      {
        path: '/despesas',
        element: <ExpensesPage />,
      },
      {
        path: '/categorias',
        element: <CategoriesPage />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <ProtectRoute>
        <AuthLayout />
      </ProtectRoute>
    ),
    children: [
      {
        path: '/sign-in',
        element: <SignInPage />,
      },
      {
        path: '/sign-up',
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
