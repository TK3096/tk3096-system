'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import { Board, Task, Workspace } from '@/types'

import { ContentHeader } from '@/components/task-management/ContentHeader'
import { getBoards, getTasks, getWorkspaces } from '@/lib/firebase/client/db'
import { TaskCard } from '@/components/task-management/board/TaskCard'

const BoardPage = () => {
  const params = useParams()
  const { workspaceId, boardId } = params

  const [workspace, setWorkspace] = useState<Workspace | null>(null)
  const [board, setBoard] = useState<Board | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])

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
    const { unsubscribe: unsubBoard } = getBoards((value: Board) => {
      if (boardId === value.id) {
        setBoard(value)
      }
    })

    const { unsubscribe: unsubTask } = getTasks((value: Task) => {
      if (value.boardId === boardId) {
        setTasks((prev) => {
          const index = prev.findIndex((task) => task.id === value.id)

          if (index !== -1) {
            const newTasks = [...prev]
            newTasks[index] = value
            return newTasks
          }

          return [...prev, value]
        })
      }
    })

    return () => {
      unsubBoard()
      unsubTask()
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
      <div className='pt-16 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 '>
        {tasks.map((task) => (
          <div key={task.id}>
            <TaskCard task={task} board={board} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BoardPage
