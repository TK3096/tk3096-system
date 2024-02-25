'use client'

import { useToast } from '@/hooks/useToast'

import { AcctionTooltip } from '@/components/common/ActionTooltip'

import { cn } from '@/lib/utils'

interface TextItemProps {
  color: string
  level: number
}

export const TextItem = (props: TextItemProps) => {
  const { color, level } = props

  const { toast } = useToast()

  const c = `text-${color}-${level}`

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
        className='w-[100px] h-[50px] rounded-md border-2 border-solid border-grey-100 cursor-pointer flex justify-center items-center'
      >
        <p className={cn('text-md', c)}>Text</p>
      </div>
    </AcctionTooltip>
  )
}
