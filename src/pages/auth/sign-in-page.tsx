import { Button } from '@/components/ui/button'
import { SignInForm } from '@/features/auth/components/sign-in-form'
import { MoveRightIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function SignInPage() {
  return (
    <div className="h-full p-6">
      <div className="h-full flex flex-col justify-between bg-white py-[4.5rem] px-20 rounded-4xl">
        <div className="space-y-2">
          <h1 className="text-2xl text-[#09090b] font-semibold">
            Acesse sua conta
          </h1>
          <p className="mt-2 text-muted-foreground">
            Informe seu e-mail e senha para entrar
          </p>

          <SignInForm />
        </div>

        <div className="flex flex-col gap-5">
          <Link
            to={'/sign-up'}
            className="hover:underline text-muted-foreground"
          >
            Ainda não tem uma conta?
          </Link>

          <Button
            size={'lg'}
            variant={'outline'}
            className="border border-rose-500! bg-transparent! justify-between h-14 text-base font-normal text-rose-500 hover:bg-rose-50/50! hover:text-rose-500!"
            asChild
          >
            <Link to={'/sign-up'}>
              Cadastrar
              <MoveRightIcon className="size-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
