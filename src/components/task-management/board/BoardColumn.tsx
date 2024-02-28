import { Board, KanbanBoardColumn, Task } from '@/types'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { TaskCard } from '@/components/task-management/board/TaskCard'

interface BoardColumnProps {
  column: KanbanBoardColumn
  tasks: Task[]
  board: Board
}

export const BoardColumn = (props: BoardColumnProps) => {
  const { column, tasks, board } = props

  return (
    <Card className='w-96 border-none shadow-xl dark:bg-neutral-700'>
      <CardHeader className='px-4 py-6 space-y-4'>
        <CardTitle className='text-center font-bold'>{column.title}</CardTitle>
        <Separator className='h-[2px] dark:bg-neutral-600 w-[90%] mx-auto' />
      </CardHeader>
      <ScrollArea className='h-[790px]'>
        <CardContent className='flex flex-col gap-4 px-4'>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} board={board} />
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  )
}
