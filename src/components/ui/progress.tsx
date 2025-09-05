import { cn } from '@/_config/lib/utils'
import { motion, type Transition } from 'motion/react'
import { Progress as ProgressPrimitive } from 'radix-ui'
import * as React from 'react'

const MotionProgressIndicator = motion.create(ProgressPrimitive.Indicator)

type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> & {
  transition?: Transition
  indicator?: string
}

function Progress({
  className,
  value,
  transition = { type: 'spring', stiffness: 100, damping: 30 },
  ...props
}: ProgressProps) {
  const safeValue = value || 0

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-secondary',
        className,
      )}
      {...props}
    >
      <MotionProgressIndicator
        data-slot="progress-indicator"
        className={cn(
          'h-full w-full flex-1 origin-left bg-primary rounded-full',
          props.indicator,
        )}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: safeValue / 100 }}
        transition={transition}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress, type ProgressProps }
