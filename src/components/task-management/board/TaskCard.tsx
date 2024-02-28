'use client'

import { Hash, Edit, PlusCircle, Pencil } from 'lucide-react'
import dayjs from 'dayjs'

import { Board, Task, TaskStatus } from '@/types'

import { useModal } from '@/hooks/useModal'

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { AcctionTooltip } from '@/components/common/ActionTooltip'
import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

interface TaskCardProps {
  task: Task
  board: Board
}

export const TaskCard = (props: TaskCardProps) => {
  const { task, board } = props

  const { onOpen } = useModal()

  return (
    <Card
      className={cn(
        'border-none p-0 overflow-hidden h-[180px] relative',
        task.status === TaskStatus.TODO && 'bg-gray-600/50',
        task.status === TaskStatus.IN_PROGRESS && 'bg-yellow-600',
        task.status === TaskStatus.REVIEW && 'bg-indigo-400',
        task.status === TaskStatus.DONE && 'bg-green-400',
      )}
    >
      <CardHeader className='px-3 py-4 space-y-3'>
        <CardTitle className='text-md font-medium'>
          <div className='flex items-center w-full'>
            <Hash className='w-3 h-3 mr-1' />
            <div className='overflow-x-scroll w-[270px]'>
              <p className='text-nowrap'>{task.name}</p>
            </div>

            <AcctionTooltip label='edit' side='top' align='center'>
              <Button
                size='icon'
                variant='ghost'
                className={cn(
                  'ml-auto w-5 h-5 hover:bg-transparent',
                  task.status === TaskStatus.TODO && 'hover:text-zinc-400',
                  task.status === TaskStatus.IN_PROGRESS &&
                    'hover:text-yellow-300',
                  task.status === TaskStatus.REVIEW && 'hover:text-indigo-200',
                  task.status === TaskStatus.DONE && 'hover:text-green-200',
                )}
                onClick={() => onOpen('editTask', { task, board })}
              >
                <Edit />
              </Button>
            </AcctionTooltip>
          </div>
        </CardTitle>
        <CardDescription
          className={cn(
            'text-zinc-400',
            task.status !== TaskStatus.TODO && 'text-primary/80',
          )}
        >
          {task.description}
        </CardDescription>
      </CardHeader>

      <CardFooter
        className={cn(
          'px-3 py-3 absolute bottom-0 w-full',
          task.status === TaskStatus.TODO && 'bg-gray-600/50',
          task.status === TaskStatus.IN_PROGRESS && 'bg-yellow-500',
          task.status === TaskStatus.REVIEW && 'bg-indigo-300',
          task.status === TaskStatus.DONE && 'bg-green-300',
        )}
      >
        <div className='flex justify-end items-center gap-3 w-full'>
          <AcctionTooltip label='create at' side='top' align='center'>
            <div className='flex items-center'>
              <PlusCircle className='h-4 w-4 mr-1' />
              <p className='text-sm'>
                {dayjs.unix(task.createdAt).format('DD/MM/YYYY')}
              </p>
            </div>
          </AcctionTooltip>
          <AcctionTooltip label='updated at' side='top' align='center'>
            <div className='flex items-center'>
              <Pencil className='h-4 w-4 mr-1' />
              <p className='text-sm'>
                {dayjs.unix(task.updatedAt).format('DD/MM/YYYY')}
              </p>
            </div>
          </AcctionTooltip>
        </div>
      </CardFooter>
    </Card>
  )
}
