'use client'

import { type LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { AcctionTooltip } from '@/components/common/ActionTooltip'

interface SidebarItemProps {
  title: string
  Icon: LucideIcon
  onClick: () => void
}

export const SidebarItem = (props: SidebarItemProps) => {
  const { title, Icon, onClick } = props

  return (
    <AcctionTooltip label={title} align='center' side='right'>
      <Button
        size='icon'
        variant='outline'
        className='w-8 h-8 group bg-transparent border-0'
        onClick={onClick}
      >
        <Icon className='w-5 h-5 group-hover:text-zinc-400' />
      </Button>
    </AcctionTooltip>
  )
}
