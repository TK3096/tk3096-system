'use client'

import { Hash, Edit } from 'lucide-react'

import { Workspace } from '@/types'

import { useModal } from '@/hooks/useModal'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { AcctionTooltip } from '@/components/common/ActionTooltip'

interface SidebarItemProps {
  workspace: Workspace
}

export const SidebarItem = (props: SidebarItemProps) => {
  const { workspace } = props

  const { onOpen } = useModal()

  return (
    <div>
      <div className='flex items-center cursor-pointer group transition-colors'>
        <Hash className='h-4 w-4 mr-2' />
        <p>{workspace.name}</p>
        <div className='flex items-center gap-1 ml-auto'>
          <AcctionTooltip label='edit' side='top' align='center'>
            <Edit
              className='h-4 w-4 dark:group-hover:text-neutral-400'
              onClick={() => onOpen('editWorkspace', { workspace })}
            />
          </AcctionTooltip>
        </div>
      </div>
      <Separator className='h-[2px] bg-neutral-700 mt-2 rounded-md' />
    </div>
  )
}
