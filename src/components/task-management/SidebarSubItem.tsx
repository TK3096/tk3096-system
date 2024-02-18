'use client'

import { Plus, Edit } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Board } from '@/types'

import { useModal } from '@/hooks/useModal'

import { AcctionTooltip } from '@/components/common/ActionTooltip'

interface SidebarSubItemProps {
  board: Board
}

export const SidebarSubItem = (props: SidebarSubItemProps) => {
  const { board } = props

  const router = useRouter()

  const { onOpen } = useModal()

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()

    onOpen('editBoard', { board })
  }

  const handleAddTask = (e: React.MouseEvent) => {
    e.stopPropagation()

    console.log('task')
  }

  const handleClick = () => {
    router.push(`/tasks-management/${board.workspaceId}/${board.id}`)
  }

  return (
    <div
      className='pl-4 py-1 cursor-pointer flex dark:bg-stone-700/50 rounded-md dark:hover:bg-stone-700/30 transition-colors'
      onClick={handleClick}
    >
      <p className='text-sm'>{board.name}</p>
      <div className='ml-auto flex gap-1'>
        <AcctionTooltip label='add task' side='top' align='center'>
          <Plus className='h-4 w-4' onClick={handleAddTask} />
        </AcctionTooltip>
        <AcctionTooltip label='edit board' side='top' align='center'>
          <Edit className='h-4 w-4' onClick={handleEdit} />
        </AcctionTooltip>
      </div>
    </div>
  )
}
