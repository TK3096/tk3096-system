'use client'

import { Hash } from 'lucide-react'

import { usePalette } from '@/hooks/usePalette'

export const ContentHeader = () => {
  const { type } = usePalette()

  return (
    <div className='flex gap-2 items-center dark:bg-zinc-800 px-4 py-3 h-12 shadow-lg'>
      <Hash />
      <h3 className='font-bold text-md capitalize'>{type}</h3>
    </div>
  )
}
