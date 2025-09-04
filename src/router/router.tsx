import AuthLayout from "@/layouts/auth-layout";
import RootLayout from "@/layouts/root-layout";
import SignInPage from "@/pages/auth/sign-in-page";
import SignUpPage from "@/pages/auth/sign-up-page";
import CategoriesPage from "@/pages/dashboard/categories-page";
import DashboardPage from "@/pages/dashboard/dashboard-page";
import ExpensesPage from "@/pages/dashboard/expenses-page";
import NotFoundPage from "@/pages/not-found-page";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
        <RootLayout />
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
        <AuthLayout />
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
    element: <NotFoundPage />
  }
])