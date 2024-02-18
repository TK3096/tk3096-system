'use client'

import { useEffect, useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { APIResponse, Workspace } from '@/types'

import { useModal } from '@/hooks/useModal'
import { useToast } from '@/hooks/useToast'

import { createBoardSchema } from '@/schemas/tasks-management'

import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogContent,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormMessage,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Select,
} from '@/components/ui/select'

import { getWorkspaces } from '@/lib/firebase/client/db'

export const CreateBoardModal = () => {
  const router = useRouter()

  const [workspaces, setWorkspaces] = useState<Workspace[]>([])

  const { open, onClose, type, data } = useModal()
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(createBoardSchema),
    defaultValues: {
      name: '',
      description: '',
      workspaceId: data?.workspace?.id || '',
    },
  })

  const isOpen = open && type === 'createBoard'
  const loading = form.formState.isSubmitting
  const isDirty = form.formState.isDirty

  const handleSubmitCreate = async (
    values: z.infer<typeof createBoardSchema>,
  ) => {
    console.log(values)
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  const handleGetWorkspaces = (workspace: Workspace) => {
    setWorkspaces((prev) => {
      const index = prev.findIndex((w) => w.id === workspace.id)

      if (index !== -1) {
        const temp = [...prev]
        temp[index] = workspace

        return temp
      }

      return [...prev, workspace]
    })
  }

  useEffect(() => {
    const { unsubscribe } = getWorkspaces(handleGetWorkspaces)

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='p-0 overflow-hidden'>
        <DialogHeader className='pt-8 pb-13 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Create a new board
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            A board is made up of cards ordered on lists. Use it to manage your
            tasks, projects, and ideas.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitCreate)}
            className='space-y-8'
          >
            <div className='px-6 space-y-2'>
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
                        type='text'
                        placeholder='Board name'
                        className='dark:bg-stone-900/50 border-none'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='workspaceId'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-sm font-bold dark:text-zinc-200'>
                      Workspace
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='dark:bg-stone-900/50 border-none'>
                          <SelectValue placeholder='select the workspace' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {workspaces.map((workspace) => (
                          <SelectItem key={workspace.id} value={workspace.id}>
                            {workspace.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                        placeholder='Board description'
                        className='dark:bg-stone-900/50 border-none'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className='bg-stone-900 px-6 py-4'>
              <Button
                type='submit'
                variant='primary'
                disabled={loading || !isDirty}
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
