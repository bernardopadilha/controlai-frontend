import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import { queryClient } from './_config/lib/react-query'
import { router } from './router/router'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-right" richColors />
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
