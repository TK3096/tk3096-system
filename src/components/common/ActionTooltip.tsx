import React from 'react'

import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'

import { cn } from '@/lib/utils'

interface AcctionTooltipProps {
  children: React.ReactNode
  label: string
  side?: 'top' | 'bottom' | 'left' | 'right'
  align?: 'start' | 'center' | 'end'
  labelClassName?: string
}

export const AcctionTooltip = (props: AcctionTooltipProps) => {
  const { label, children, side, align, labelClassName } = props

  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className={cn('capitalize font-semibold text-sm', labelClassName)}>
            {label}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
