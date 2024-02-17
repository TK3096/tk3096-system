'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

import { useToast } from '@/hooks/useToast'

import { AcctionTooltip } from '@/components/common/ActionTooltip'
import { Button } from '@/components/ui/button'

import { signOut } from '@/lib/firebase/client/auth'

export const SignOutButton = () => {
  const router = useRouter()

  const { toast } = useToast()

  const handleSignOut = async () => {
    try {
      const res = await signOut()

      if (res) {
        router.push('/')
      } else {
        toast({
          title: 'Sign out',
          description: 'Fail to sing out',
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

  return (
    <AcctionTooltip label='sign out' align='center' side='right'>
      <Button
        size='icon'
        variant='ghost'
        className='w-8 h-8 group'
        onClick={handleSignOut}
      >
        <LogOut className='w-5 h-5 group-hover:text-zinc-400' />
      </Button>
    </AcctionTooltip>
  )
}
