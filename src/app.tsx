import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import { queryClient } from './_config/lib/react-query'
import { ThemeProvider } from './components/theme-provider'
import { UserProvider } from './context/user-context'
import { router } from './router/router'

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-provider">
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Toaster position="bottom-right" richColors />
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </UserProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
