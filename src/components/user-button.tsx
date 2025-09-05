import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { LogOutIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function UserButton() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  async function signOut() {
    Cookies.remove('access_token')
    queryClient.invalidateQueries({ queryKey: ['verify-login'] })
    navigate('/sign-in')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="uppercase rounded-full size-7"
        >
          b
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={8} align="end" className="space-y-2">
        <DropdownMenuItem className="flex items-center">
          <span className="size-8 rounded-full uppercase border dark:bg-input/30 dark:border-input flex items-center justify-center">
            B
          </span>
          <div>
            <h2 className="font-medium">Bernardo Padilha</h2>
            <p className="text-xs">bernardoa.padilha@gmail.com</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            variant={'outline'}
            onClick={signOut}
            className="w-full h-full border-none cursor-pointer"
          >
            <LogOutIcon className="stroke-rose-500 " />
            Sair
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
