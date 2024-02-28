'use client'

import { Hash, Edit, Plus } from 'lucide-react'

import { Board, Workspace } from '@/types'

import { useModal } from '@/hooks/useModal'

import { Separator } from '@/components/ui/separator'
import { AcctionTooltip } from '@/components/common/ActionTooltip'
import { SidebarSubItem } from './SidebarSubItem'

interface SidebarItemProps {
  workspace: Workspace
  boards: Board[]
}

export const SidebarItem = (props: SidebarItemProps) => {
  const { workspace, boards } = props

  const { onOpen } = useModal()

  return (
    <div>
      <div className='flex items-center cursor-pointer'>
        <Hash className='h-4 w-4 mr-2' />
        <div className='w-[150px]'>
          <p className='text-nowrap text-ellipsis overflow-hidden'>
            {workspace.name}
          </p>
        </div>
        <div className='flex items-center gap-1 ml-auto'>
          <AcctionTooltip label='add board' side='top' align='center'>
            <Plus
              className='h-4 w-4 dark:hover:text-neutral-400 transition-colors'
              onClick={() => onOpen('createBoard', { workspace })}
            />
          </AcctionTooltip>
          <AcctionTooltip label='edit workspace' side='top' align='center'>
            <Edit
              className='h-4 w-4 dark:hover:text-neutral-400 transition-colors'
              onClick={() => onOpen('editWorkspace', { workspace })}
            />
          </AcctionTooltip>
        </div>
      </div>
      <Separator className='h-[2px] bg-neutral-700 mt-2 rounded-md' />
      <div className='space-y-2 pt-2'>
        {boards.map((board) => (
          <div key={board.id}>
            <SidebarSubItem board={board} />
          </div>
        ))}
      </div>
    </div>
  )
}
