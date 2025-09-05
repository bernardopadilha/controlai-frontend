import { api } from '@/_config/lib/axios'
import { useUser } from '@/context/user-context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import type { UseFormReset } from 'react-hook-form'
import { toast } from 'sonner'
import type { SignUpSchemaProps } from '../schema'

export function useSignUp({
  reset,
}: {
  reset: UseFormReset<SignUpSchemaProps>
}) {
  const { setNewUser } = useUser()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ name, email, password }: SignUpSchemaProps) => {
      const { data } = await api.post('/auth/sign-up', {
        name,
        email,
        password,
      })

      const { accessToken } = data

      Cookies.set('access_token', accessToken, {
        path: '/',
        expires: 7,
      })
    },
    onSuccess: async () => {
      toast.success('Conta criada com sucesso', {
        id: 'sign-up',
      })
      await queryClient.invalidateQueries({ queryKey: ['verify-login'] })
      setNewUser()
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
