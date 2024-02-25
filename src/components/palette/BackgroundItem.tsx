'use client'

import { useToast } from '@/hooks/useToast'

import { AcctionTooltip } from '@/components/common/ActionTooltip'

import { cn } from '@/lib/utils'

interface BackgroundItemProps {
  color: string
  level: number
}

export const BackgroundItem = (props: BackgroundItemProps) => {
  const { color, level } = props

  const { toast } = useToast()

  const c = `bg-${color}-${level}`

  const handleCopy = () => {
    navigator.clipboard.writeText(c)

    toast({
      title: `Copied ${c}`,
    })
  }

  return (
    <AcctionTooltip
      label={c}
      side='top'
      align='center'
      labelClassName='lowercase'
    >
      <div
        onClick={handleCopy}
        className={cn(
          'w-[100px] h-[50px] rounded-md border-2 border-solid border-grey-100 cursor-pointer',
          c,
        )}
      />
    </AcctionTooltip>
  )
}
