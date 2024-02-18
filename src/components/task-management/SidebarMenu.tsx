'use client'

import { useEffect, useState } from 'react'

import { Workspace } from '@/types'

import { SidebarItem } from '@/components/task-management/SidebarItem'
import { ScrollArea } from '@/components/ui/scroll-area'

import { getWorkspaces } from '@/lib/firebase/client/db'

export const SidebarMenu = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])

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
    <div className='flex flex-col h-full'>
      <ScrollArea className='flex-1 w-full'>
        <div className='space-y-5 px-4 py-2'>
          {workspaces.map((workspace) => (
            <div key={workspace.id}>
              <SidebarItem workspace={workspace} />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
