'use client'

import { useEffect, useState } from 'react'

import { Board, KanbanBoardColumn, Task, TaskStatus } from '@/types'

import { BoardContainer } from '@/components/task-management/board/BoardContainer'
import { BoardColumn } from '@/components/task-management/board/BoardColumn'

import { getTasks } from '@/lib/firebase/client/db'

interface KanbanBoardProps {
  board: Board
}

const COLUMNS: KanbanBoardColumn[] = [
  {
    id: TaskStatus.TODO,
    title: 'To Do',
  },
  {
    id: TaskStatus.IN_PROGRESS,
    title: 'In Progress',
  },
  {
    id: TaskStatus.REVIEW,
    title: 'Review',
  },
  {
    id: TaskStatus.DONE,
    title: 'Done',
  },
]

export const KanbanBoard = (props: KanbanBoardProps) => {
  const { board } = props

  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const { unsubscribe } = getTasks((value: Task) => {
      if (value.boardId === board.id) {
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
      unsubscribe()
    }
  }, [board])

  return (
    <div>
      <BoardContainer>
        {COLUMNS.map((col) => (
          <BoardColumn
            key={col.id}
            column={col}
            tasks={tasks.filter((task) => task.status === col.id)}
            board={board}
          />
        ))}
      </BoardContainer>
    </div>
  )
}
