'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useModal } from '@/hooks/useModal'

import { workspaceSchema } from '@/schemas/tasks-management'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormMessage,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

export const CreateWorkspaceModal = () => {
  const { type, open, onClose } = useModal()

  const form = useForm({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const isOpen = open && type === 'createWorkspace'
  const loading = form.formState.isSubmitting
  const isDirty = form.formState.isDirty

  const handleSubmitCreate = async (
    values: z.infer<typeof workspaceSchema>,
  ) => {
    console.log(values)
    handleClose()
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='p-0 overflow-hidden'>
        <DialogHeader className='pt-8 pb-13 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Create a new workspace
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Workspaces are where you collaborate with your team. They can be
            public or private.
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
                        placeholder='Workspace name'
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
