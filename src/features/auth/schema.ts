import z from 'zod'

const passwordSchema = z
  .string({ message: 'Por favor preencha esse campo' })
  .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  .regex(/[A-Z]/, {
    message: 'A senha deve conter pelo menos uma letra maiúscula',
  })
  .regex(/[a-z]/, {
    message: 'A senha deve conter pelo menos uma letra minúscula',
  })
  .regex(/[0-9]/, { message: 'A senha deve conter pelo menos um número' })
  .regex(/[^A-Za-z0-9]/, {
    message: 'A senha deve conter pelo menos um caractere especial',
  })

export const signInSchema = z.object({
  email: z
    .string({ message: 'Por favor preencha esse campo' })
    .email({ message: 'Por favor digite um e-mail válido' }),
  password: z.string({ message: 'Por favor preencha esse campo' }),
})

export const signUpSchema = z.object({
  name: z
    .string({ message: 'Por favor preencha esse campo' })
    .min(3, { message: 'Nome deve ter pelo menos 3 caracteres' })
    .max(100, { message: 'Nome deve ter no máximo 100 caracteres' }),
  email: z
    .string({ message: 'Por favor preencha esse campo' })
    .email({ message: 'Formato de email inválido' })
    .min(5, { message: 'Email deve ter pelo menos 5 caracteres' })
    .max(100, { message: 'Email deve ter no máximo 100 caracteres' }),
  password: passwordSchema,
  confirmPassword: passwordSchema,
})

export type SignUpSchemaProps = z.infer<typeof signUpSchema>
export type SignInSchemaProps = z.infer<typeof signInSchema>
