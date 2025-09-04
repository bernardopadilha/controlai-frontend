import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { MoveRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  return (
    <div className="h-screen p-3 lg:p-6 flex justify-center items-center">
      <div className="h-full max-h-full w-full flex flex-col justify-between bg-white rounded-4xl py-[25px] px-[2px]">
        <div className="px-3 lg:py-[25px] lg:px-[78px] overflow-auto">
          <div>
            <div className="mb-10 block lg:hidden">
              <Logo />
            </div>
            <h1 className="text-2xl text-foreground font-semibold">
              Crie sua conta
            </h1>
            <p className="mt-2 text-muted-foreground">Informe os seus dados pessoais e de acesso</p>

            <SignUpForm />
          </div>

          <div className="flex flex-col gap-5 mt-10">
            <Link to={'/sign-in'} className="hover:underline text-muted-foreground">
              Já tem uma conta?
            </Link>

            <Button 
              size={'lg'} 
              variant={'outline'} 
              className="border border-rose-500 bg-transparent justify-between h-14 text-base font-normal text-rose-500 hover:bg-rose-50/20 hover:text-rose-500" 
              asChild
            >
              <Link to={'/sign-in'}>
                Acessar
                <MoveRightIcon className="size-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
