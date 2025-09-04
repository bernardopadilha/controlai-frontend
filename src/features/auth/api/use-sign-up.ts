import { api } from '@/_config/lib/axios'
import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import type { UseFormReset } from 'react-hook-form'
import { toast } from 'sonner'
import type { SignUpSchemaProps } from '../schema'

export function useSignUp({
  reset,
}: {
  reset: UseFormReset<SignUpSchemaProps>
}) {
  const mutation = useMutation({
    mutationFn: async ({ name, email, password }: SignUpSchemaProps) => {
      const { data } = await api.post('/auth/sign-up', {
        name,
        email,
        password,
      })

      const { accessToken } = data

      Cookies.set('accessToken', accessToken, {
        path: '/',
        expires: 7,
      })
    },
    onSuccess: async () => {
      toast.success('Conta criada com sucesso', {
        id: 'sign-up',
      })
      reset({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
    },
    onError: (error) => {
      toast.error(error.message, {
        id: 'sign-up',
      })
    },
  })

  return mutation
}
