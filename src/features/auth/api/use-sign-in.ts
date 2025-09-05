import { api } from '@/_config/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import type { UseFormReset } from 'react-hook-form'
import { toast } from 'sonner'
import type { SignInSchemaProps } from '../schema'

export function useSignIn({
  reset,
}: {
  reset: UseFormReset<SignInSchemaProps>
}) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ email, password }: SignInSchemaProps) => {
      const response = await api.post('/auth/sign-in', {
        email,
        password,
      })

      const { accessToken } = response.data

      Cookies.set('access_token', accessToken, {
        path: '/',
        expires: 7,
      })

      return response.data
    },
    onSuccess: () => {
      toast.success('Login efetuado com sucesso', {
        id: 'sign-in',
      })
      queryClient.invalidateQueries({ queryKey: ['verify-login'] })
      reset({
        email: '',
        password: '',
      })
    },
    onError: (error) => {
      toast.error(error.message, {
        id: 'sign-in',
      })
    },
  })

  return mutation
}
