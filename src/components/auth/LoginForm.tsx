'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { loginSchema } from '@/schemas/auth'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const LoginForm = () => {
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loading = form.formState.isSubmitting
  const isDirty = form.formState.isDirty

  const handleSubmitLogin = (values: z.infer<typeof loginSchema>) => {
    console.log(values)
  }

  return (
    <div className='dark:bg-[#262626] px-7 py-10 w-1/4 shadow-md rounded-lg'>
      <h1 className='text-3xl text-center mb-3 font-bold'>TK3096 System</h1>
      <Separator className='h-[2px] w-3/4 mx-auto my-8 dark:bg-neutral-700 rounded-full' />

      <Form {...form}>
        <form
          className='space-y-3'
          onSubmit={form.handleSubmit(handleSubmitLogin)}
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-sm font-bold dark:text-zinc-200'>
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    type='email'
                    placeholder='Your email'
                    className='dark:bg-stone-900/50 border-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-sm font-bold dark:text-zinc-200'>
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    type='password'
                    placeholder='Your password'
                    className='dark:bg-stone-900/50 border-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='pt-8'>
            <Button
              disabled={loading || !isDirty}
              className='capitalize w-full'
              variant='primary'
            >
              sign in
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
