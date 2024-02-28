'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import { Board, Workspace } from '@/types'

import { useTasksManagement } from '@/hooks/useTasksManagement'

import { ContentHeader } from '@/components/task-management/ContentHeader'
import { getBoards, getWorkspaces } from '@/lib/firebase/client/db'
import { KanbanBoard } from '@/components/task-management/board/KanbanBoard'

const BoardPage = () => {
  const params = useParams()
  const { workspaceId, boardId } = params

  const { boards, workspaces } = useTasksManagement()

  const workspace = workspaces.find((w: Workspace) => w.id === workspaceId)

  if (!workspace) {
    return null
  }

  const board = boards[workspaceId as string].find(
    (b: Board) => b.id === boardId,
  )

  if (!workspace || !board) {
    return null
  }

  return (
    <div className='h-full'>
      <div className='fixed w-full'>
        <ContentHeader workspace={workspace} board={board} />
      </div>
      <div className='pt-16 px-4'>
        <KanbanBoard board={board} />
      </div>
    </div>
  )
}

export default BoardPage
