'use client'

import { Hash, Edit } from 'lucide-react'

import { Board, Task, TaskStatus } from '@/types'

import { useModal } from '@/hooks/useModal'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { cn } from '@/lib/utils'

interface TaskCardProps {
  task: Task
  board: Board
}

export const TaskCard = (props: TaskCardProps) => {
  const { task, board } = props

  const { onOpen } = useModal()

  return (
    <Card className='bg-neutral-700'>
      <CardHeader className='px-4 pt-6'>
        <CardTitle className='text-2xl font-bold'>
          <div className='flex items-center'>
            {task.name}{' '}
            <Edit
              className='ml-auto cursor-pointer hover:text-neutral-300 transition-colors'
              onClick={() => onOpen('editTask', { task, board })}
            />
          </div>
        </CardTitle>
        <CardDescription className='text-sm'>
          {task.description}
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-5'>
        <Badge
          className={cn(
            'uppercase font-bold',
            task.status === TaskStatus.TODO && 'text-indigo-600 bg-indigo-100',
            task.status === TaskStatus.IN_PROGRESS &&
              'text-yellow-600 bg-yellow-100',
            task.status === TaskStatus.REVIEW && 'text-lime-600 bg-lime-100',
            task.status === TaskStatus.DONE &&
              'text-emerald-600 bg-emerald-100',
          )}
        >
          {task.status}
        </Badge>
        <p>Remarks</p>
        <div className='overflow-scroll h-[100px]'>
          {task.remarks.length == 0 && (
            <p className='text-sm text-zinc-200'>No remarks</p>
          )}
          {task.remarks.length > 0 && (
            <ul className='bg-neutral-600 rounded-sm px-2'>
              {task.remarks.map((remark) => (
                <li key={remark} className='py-1 flex items-center gap-2'>
                  <Hash className='h-3 w-3' />
                  {remark}
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
