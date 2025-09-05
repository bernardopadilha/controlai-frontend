import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import { queryClient } from './_config/lib/react-query'
import { ThemeProvider } from './components/theme-provider'
import { router } from './router/router'

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-provider">
      <QueryClientProvider client={queryClient}>
        <Toaster position="bottom-right" richColors />
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
