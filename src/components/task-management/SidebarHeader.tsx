'use client'

import { Archive, ChevronDown, LayoutDashboard, FileText } from 'lucide-react'

import { useModal } from '@/hooks/useModal'

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const SidebarHeader = () => {
  const { onOpen } = useModal()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='focus:outline-none'>
        <button className='w-full h-12 px-3 text-md font-semibold flex items-center border-neutral-700 border-b-2 dark:hover:bg-zinc-700/50 transition'>
          Task Management
          <ChevronDown className='h-5 w-5 ml-auto' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[240px] text-sm font-medium text-neutral-400 space-y-1'>
        <DropdownMenuItem
          className='cursor-pointer px-3 py-2 dark:text-indigo-400 dark:hover:text-indigo-400/80'
          onClick={() => onOpen('createWorkspace')}
        >
          Create Workspace
          <Archive className='h-5 w-5 ml-auto' />
        </DropdownMenuItem>
        <DropdownMenuItem
          className='cursor-pointer px-3 py-2 dark:text-rose-400 dark:hover:text-rose-400/80'
          onClick={() => onOpen('createBoard')}
        >
          Create Board
          <LayoutDashboard className='h-5 w-5 ml-auto' />
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer px-3 py-2'>
          Create Task
          <FileText className='h-5 w-5 ml-auto' />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
