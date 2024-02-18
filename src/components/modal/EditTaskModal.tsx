'use client'

import { useEffect, useState } from 'react'
import qs from 'query-string'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { useModal } from '@/hooks/useModal'
import { toast } from '@/hooks/useToast'

import { APIResponse, Board, TaskStatus } from '@/types'

import { editTaskSchema } from '@/schemas/tasks-management'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormMessage,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'

export const EditTaskModal = () => {
  const router = useRouter()

  const [boards, setBoards] = useState<Board[]>([])
  const [remarkFields, setRemarkFields] = useState<string[]>([''])

  const { onClose, type, open, data } = useModal()

  const form = useForm({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      name: '',
      description: '',
      boardId: '',
      status: TaskStatus.TODO,
      remarks: [] as string[],
    },
  })

  const isOpen = open && type === 'editTask'
  const loading = form.formState.isSubmitting
  const isDirty = form.formState.isDirty

  const handleChangeRemarkField = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    setRemarkFields((prev) => {
      const temp = [...prev]
      temp[index] = e.target.value

      if (index === prev.length - 1) {
        temp.push('')
      }

      return temp
    })

    form.setValue('remarks', [
      ...remarkFields.slice(0, index),
      e.target.value,
      ...remarkFields.slice(index + 1),
    ])
  }

  const handleSubmitEdit = async (values: z.infer<typeof editTaskSchema>) => {
    try {
      const remarks = values.remarks.filter((remark) => remark !== '')
      const url = qs.stringifyUrl({
        url: `/api/tasks-management/task/${data?.task?.id}`,
      })

      const res = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, remarks }),
      })

      const resBody = (await res.json()) as APIResponse<{ id: string }>

      if (res.ok && resBody.status) {
        toast({
          title: 'Update task',
          description: 'Successfully to update task',
        })
        handleClose()
        router.refresh()
      } else {
        toast({
          title: 'Update task',
          description: !resBody.status ? resBody.error : 'Fail to update task',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'Internal error',
        variant: 'destructive',
      })
    }
  }

  const handleClose = () => {
    form.reset()
    setRemarkFields([''])
    onClose()
  }

  useEffect(() => {
    if (data?.board) {
      form.setValue('boardId', data.board.id)

      setBoards([data.board])
    }

    if (data?.task) {
      form.setValue('name', data.task.name)
      form.setValue('description', data.task.description)
      form.setValue('status', data.task.status)
      form.setValue('remarks', data.task.remarks)

      setRemarkFields([...data.task.remarks, ''])
    }
  }, [form, data])

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='p-0 overflow-hidden'>
        <DialogHeader className='pt-8 pb-13 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Create a new task
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Fill the form below to create a new task
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitEdit)}
            className='space-y-8'
          >
            <div className='px-6 space-y-2'>
              <FormField
                name='boardId'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-sm font-bold dark:text-zinc-200'>
                      Board
                    </FormLabel>
                    <Select
                      disabled
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='dark:bg-stone-900/50 border-none'>
                          <SelectValue placeholder='select the board' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {boards.map((board) => (
                          <SelectItem key={board.id} value={board.id}>
                            {board.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='name'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-sm font-bold dark:text-zinc-200'>
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Task name'
                        className='dark:bg-stone-900/50 border-none'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='description'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-sm font-bold dark:text-zinc-200'>
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={loading}
                        placeholder='Workspace desciption'
                        className='dark:bg-stone-900/50 border-none'
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='status'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-sm font-bold dark:text-zinc-200'>
                      Status
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='dark:bg-stone-900/50 border-none'>
                          <SelectValue placeholder='select the board' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(TaskStatus).map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel className='uppercase text-sm font-bold dark:text-zinc-200'>
                  Remarks
                </FormLabel>
                <ScrollArea className='h-[150px]'>
                  <div className='space-y-2'>
                    {remarkFields.map((remark, index) => (
                      <div key={`remark-${index}`}>
                        <Input
                          disabled={loading}
                          placeholder='Task remark'
                          className='dark:bg-stone-900/50 border-none'
                          value={remark}
                          onChange={(e) => handleChangeRemarkField(e, index)}
                        />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </FormItem>
            </div>

            <DialogFooter className='bg-stone-900 px-6 py-4'>
              <Button
                type='button'
                variant='secondary'
                onClick={handleClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                variant='primary'
                disabled={loading || !isDirty}
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
