import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import React from 'react'

interface AcctionTooltipProps {
  children: React.ReactNode
  label: string
  side?: 'top' | 'bottom' | 'left' | 'right'
  align?: 'start' | 'center' | 'end'
}

export const AcctionTooltip = (props: AcctionTooltipProps) => {
  const { label, children, side, align } = props

  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className='capitalize font-semibold text-sm'>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
