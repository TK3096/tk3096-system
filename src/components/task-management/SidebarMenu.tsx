'use client'

import { useEffect, useState } from 'react'

import { Board, Workspace, WorkspaceWithBoard } from '@/types'

import { SidebarItem } from '@/components/task-management/SidebarItem'
import { ScrollArea } from '@/components/ui/scroll-area'

import { getWorkspaces, getBoards } from '@/lib/firebase/client/db'

export const SidebarMenu = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [boards, setBoards] = useState<WorkspaceWithBoard | null>(null)

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

  const handleGetBoards = (board: Board) => {
    setBoards((prev) => {
      const workspaceId = board.workspaceId

      if (!prev || !prev[workspaceId]) {
        return { ...prev, [workspaceId]: [board] }
      }

      const index = prev[workspaceId].findIndex((b) => b.id === board.id)

      if (index !== -1) {
        const temp = { ...prev }
        temp[workspaceId][index] = board

        return temp
      }

      return { ...prev, [workspaceId]: [...prev[workspaceId], board] }
    })
  }

  useEffect(() => {
    const { unsubscribe } = getWorkspaces(handleGetWorkspaces)

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    const { unsubscribe } = getBoards(handleGetBoards)

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
              <SidebarItem
                workspace={workspace}
                boards={
                  boards && boards[workspace.id] ? boards[workspace.id] : []
                }
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
