'use client'

import { Edit } from 'lucide-react'
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

  const handleClick = () => {
    router.push(`/tasks-management/${board.workspaceId}/${board.id}`)
  }

  return (
    <div
      className='pl-4 py-1 cursor-pointer flex dark:bg-stone-700/50 rounded-md dark:hover:bg-stone-700/30 transition-colors'
      onClick={handleClick}
    >
      <div className='text-[140px]'>
        <p className='text-sm text-nowrap text-ellipsis overflow-hidden'>
          {board.name}
        </p>
      </div>
      <div className='ml-auto flex gap-1'>
        <AcctionTooltip label='edit board' side='top' align='center'>
          <Edit className='h-4 w-4' onClick={handleEdit} />
        </AcctionTooltip>
      </div>
    </div>
  )
}
