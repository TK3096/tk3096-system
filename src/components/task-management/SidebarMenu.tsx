'use client'

import { useEffect, useState, useMemo, useCallback } from 'react'

import { Board, Workspace, WorkspaceWithBoard } from '@/types'

import { SidebarItem } from '@/components/task-management/SidebarItem'
import { ScrollArea } from '@/components/ui/scroll-area'

import { getWorkspaces, getBoards } from '@/lib/firebase/client/db'

export const SidebarMenu = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [boards, setBoards] = useState<WorkspaceWithBoard | null>(null)

  const sortedWorkspaces = useMemo(() => {
    const sorted = [...workspaces]
    return sorted.sort((a, b) => a.createdAt - b.createdAt)
  }, [workspaces])

  const sortBoards = useCallback(
    (workspaceId: string) => {
      if (!boards || !boards[workspaceId]) return []

      return boards[workspaceId].sort((a, b) => a.createdAt - b.createdAt)
    },
    [boards],
  )

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
          {sortedWorkspaces.map((workspace) => (
            <div key={workspace.id}>
              <SidebarItem
                workspace={workspace}
                boards={
                  boards && boards[workspace.id] ? sortBoards(workspace.id) : []
                }
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
