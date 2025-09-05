import { cn } from '@/_config/lib/utils'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Logo } from './logo'
import { ModeToggle } from './mode-togle'
import { Button, buttonVariants } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { UserButton } from './user-button'

export function Navbar() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  )
}

const items = [
  { label: 'Dashboard', link: '/' },
  { label: 'Despesas', link: '/despesas' },
  { label: 'Categorias', link: '/categorias' },
]

function MobileNavbar() {
  const [open, setIsOpen] = useState(false)

  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={open} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px] p-5" side="left">
            <Logo className="w-[150px]" />
            <div className="flex flex-col gap-1 pt-4">
              {items.map((item) => (
                <NavbarItem
                  key={item.label}
                  link={item.link}
                  label={item.label}
                  clickCallBack={() => setIsOpen((prev) => !prev)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <Logo className="w-[150px]" />
          <div className="flex items-center gap-2">
            <ModeToggle />
            <UserButton />
          </div>
        </div>
      </nav>
    </div>
  )
}

function DesktopNavbar() {
  return (
    <div className="hidden border-separate border-b bg-background md:block">
      <nav className="container mx-auto flex items-center justify-between px-8">
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <Logo className="w-[200px]" />
          <div className="flex h-full">
            {items.map((item) => (
              <NavbarItem
                key={item.label}
                link={item.link}
                label={item.label}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserButton />
        </div>
      </nav>
    </div>
  )
}

function NavbarItem({
  link,
  label,
  clickCallBack,
}: {
  link: string
  label: string
  clickCallBack?: () => void
}) {
  const { pathname } = useLocation()
  const isActive = pathname === link
  return (
    <div className="relative flex items-center">
      <Link
        to={link}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'w-full justify-start text-lg font-normal text-muted-foreground hover:text-foreground',
          isActive && 'text-foreground!',
        )}
        onClick={() => {
          if (clickCallBack) clickCallBack()
        }}
      >
        {label}
      </Link>
      {isActive && (
        <div className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 hidden h-[2px] w-[80%] rounded-xl bg-foreground md:block"></div>
      )}
    </div>
  )
}
