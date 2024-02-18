'use client'

import { Hash, Plus } from 'lucide-react'

import { Board, Workspace } from '@/types'

import { useModal } from '@/hooks/useModal'

import { Button } from '@/components/ui/button'

interface ContentHeaderProps {
  workspace: Workspace
  board: Board
}

export const ContentHeader = (props: ContentHeaderProps) => {
  const { workspace, board } = props

  const { onOpen } = useModal()

  return (
    <div className='flex gap-2 items-center dark:bg-zinc-800 px-4 py-3 h-12 shadow-lg'>
      <Hash />
      <h3 className='font-bold text-md'>
        {workspace.name} / {board.name}
      </h3>
      <div className='ml-4'>
        <Button
          size='sm'
          variant='primary'
          className='w-fit px-2'
          onClick={() => onOpen('createTask', { board })}
        >
          <Plus className='h-5 w-5 mr-2' />
          Add new task
        </Button>
      </div>
    </div>
  )
}
