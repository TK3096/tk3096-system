'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import { Board, Workspace } from '@/types'

import { ContentHeader } from '@/components/task-management/ContentHeader'
import { getBoards, getWorkspaces } from '@/lib/firebase/client/db'

const BoardPage = () => {
  const params = useParams()
  const { workspaceId, boardId } = params

  const [workspace, setWorkspace] = useState<Workspace | null>(null)
  const [board, setBoard] = useState<Board | null>(null)

  useEffect(() => {
    const { unsubscribe } = getWorkspaces((value: Workspace) => {
      if (workspaceId === value.id) {
        setWorkspace(value)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [workspaceId])

  useEffect(() => {
    const { unsubscribe } = getBoards((value: Board) => {
      if (boardId === value.id) {
        setBoard(value)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [boardId])

  if (!workspace || !board) {
    return null
  }

  return (
    <div className='h-full'>
      <div className='fixed w-full'>
        <ContentHeader workspace={workspace} board={board} />
      </div>
      <div className='pt-16 px-4'>
        <div>w</div>
      </div>
    </div>
  )
}

export default BoardPage
