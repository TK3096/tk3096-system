'use client'

import { ChevronDown, Hash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

interface SidebarItemProps {
  title: string
  parentId: string
}

export const SidebarItem = (props: SidebarItemProps) => {
  const { title, parentId } = props

  return (
    <div>
      <div className='flex items-center cursor-pointer dark:hover:text-neutral-200 transition-colors'>
        <Hash className='h-4 w-4 mr-2' />
        <p>{title}</p>
        <ChevronDown className='h-5 w-5 ml-auto' />
      </div>
      <Separator className='h-[2px] bg-neutral-700 mt-2 rounded-md' />
    </div>
  )
}
