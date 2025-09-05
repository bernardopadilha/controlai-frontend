import { cn } from '@/_config/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon, Loader2Icon, MoveRight } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useSignIn } from '../api/use-sign-in'
import { signInSchema, type SignInSchemaProps } from '../schema'

export function SignInForm() {
  const [inputType, setInputType] = useState<'text' | 'password'>('password')

  const form = useForm<SignInSchemaProps>({
    resolver: zodResolver(signInSchema),
  })

  const { mutate, isPending } = useSignIn({
    reset: form.reset,
  })

  const OnSubmit = useCallback(
    ({ email, password }: SignInSchemaProps) => {
      toast.loading('Entrando na sua conta', {
        id: 'sign-in',
      })

      mutate({
        email,
        password,
      })
    },
    [mutate],
  )

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(OnSubmit)}
        className="mt-12 space-y-5 text-base"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">E-mail</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="Seu email cadastrado"
                  className="h-10 shadow-none text-[#3D3D3D] border-[#e4e4e7] focus-visible:border-rose-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={inputType}
                    className="h-10 shadow-none text-[#3D3D3D] border-[#e4e4e7] focus-visible:border-rose-500"
                    placeholder="Sua senha de acesso"
                  />
                  <Button
                    type="button"
                    variant={'ghost'}
                    size={'icon'}
                    className="absolute top-1/2 -translate-y-1/2 right-2 text-[#949494] hover:bg-zinc-50/70 hover:text-[#777777]"
                    onClick={() =>
                      setInputType(inputType === 'text' ? 'password' : 'text')
                    }
                  >
                    <EyeIcon
                      className={cn(
                        'size-5',
                        inputType === 'password' ? 'block' : 'hidden',
                      )}
                    />
                    <EyeOffIcon
                      className={cn(
                        'size-5',
                        inputType === 'text' ? 'block' : 'hidden',
                      )}
                    />
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          size={'lg'}
          className="mt-5 h-14 justify-between w-full text-white bg-rose-500 text-base font-normal"
        >
          {isPending ? (
            <>
              Acessando...
              <Loader2Icon className="size-5  animate-spin" />
            </>
          ) : (
            <>
              Acessar
              <MoveRight className="size-5" />
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
