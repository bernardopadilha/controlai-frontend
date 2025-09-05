import { cn } from '@/_config/lib/utils'
import type { ReactNode } from 'react'
import { Skeleton } from './ui/skeleton'

export function SkeletonWrapper({
  children,
  isLoading,
  fullWidth = true,
}: {
  children: ReactNode
  isLoading: boolean
  fullWidth?: boolean
}) {
  if (!isLoading) return children
  return (
    <Skeleton className={cn(fullWidth && 'w-full')}>
      <div className="opacity-0">{children}</div>
    </Skeleton>
  )
}
