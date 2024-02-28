'use client'

import { Board, KanbanBoardColumn, TaskStatus } from '@/types'

import { useTasksManagement } from '@/hooks/useTasksManagement'

import { BoardContainer } from '@/components/task-management/board/BoardContainer'
import { BoardColumn } from '@/components/task-management/board/BoardColumn'

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

  const { tasks } = useTasksManagement()

  return (
    <div>
      <BoardContainer>
        {COLUMNS.map((col) => (
          <BoardColumn
            key={col.id}
            column={col}
            tasks={
              tasks && tasks[board.id]
                ? tasks[board.id].filter((task) => task.status === col.id)
                : []
            }
            board={board}
          />
        ))}
      </BoardContainer>
    </div>
  )
}
