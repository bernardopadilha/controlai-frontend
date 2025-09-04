import { cn } from '@/_config/lib/utils'
import { Link } from 'react-router-dom'

export function Logo({ className }: { className?: string }) {
  return (
    <Link to={'/'}>
      <img src="/logo.svg" alt="Logo Marketplace" className={cn(className)} />
    </Link>
  )
}
