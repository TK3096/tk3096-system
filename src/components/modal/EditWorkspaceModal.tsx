'use client'

import { useEffect } from 'react'
import qs from 'query-string'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { APIResponse } from '@/types'

import { useModal } from '@/hooks/useModal'
import { useToast } from '@/hooks/useToast'

import { editWorkspaceSchema } from '@/schemas/tasks-management'

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

export const EditWorkspaceModal = () => {
  const router = useRouter()

  const { type, open, onClose, data } = useModal()
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(editWorkspaceSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const isOpen = open && type === 'editWorkspace'
  const loading = form.formState.isSubmitting
  const isDirty = form.formState.isDirty

  const handleSubmitCreate = async (
    values: z.infer<typeof editWorkspaceSchema>,
  ) => {
    try {
      const url = qs.stringifyUrl({
        url: `/api/tasks-management/workspace/${data?.workspace?.id}`,
      })
      const res = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const resBody = (await res.json()) as APIResponse<{ id: string }>

      if (res.ok && resBody.status) {
        handleClose()
        toast({
          title: 'Update workspace',
          description: 'Successfully to update workspace',
        })
        router.refresh()
      } else {
        toast({
          title: 'Update workspace',
          description: !resBody.status
            ? resBody.error
            : 'Fail to update workspace',
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
    onClose()
  }

  useEffect(() => {
    if (data?.workspace) {
      form.setValue('name', data.workspace.name)
      form.setValue('description', data.workspace.description)
    }
  }, [data, form])

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='p-0 overflow-hidden'>
        <DialogHeader className='pt-8 pb-13 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Edit workspace
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Workspaces are where you store task boards.
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
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
