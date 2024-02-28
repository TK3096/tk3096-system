import { useState, useEffect, useMemo } from 'react'

import {
  Board,
  BoardWithTask,
  Task,
  Workspace,
  WorkspaceWithBoard,
} from '@/types'

import { getWorkspaces, getBoards, getTasks } from '@/lib/firebase/client/db'

export const useTasksManagement = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [boards, setBoards] = useState<WorkspaceWithBoard | null>(null)
  const [tasks, setTasks] = useState<BoardWithTask | null>(null)

  const sortedWorkspaces = useMemo(() => {
    const sorted = [...workspaces]
    return sorted.sort((a, b) => a.createdAt - b.createdAt)
  }, [workspaces])

  const sortedBoards = useMemo(() => {
    if (!boards) return {}

    const sorted = { ...boards }

    Object.entries(boards).forEach(([key, val]) => {
      sorted[key] = val.sort((a, b) => a.createdAt - b.createdAt)
    })

    return sorted
  }, [boards])

  const sortedTasks = useMemo(() => {
    if (!tasks) return {}

    const sorted = { ...tasks }

    Object.entries(tasks).forEach(([key, val]) => {
      sorted[key] = val.sort((a, b) => a.createdAt - b.createdAt)
    })

    return sorted
  }, [tasks])

  useEffect(() => {
    const { unsubscribe } = getWorkspaces((workspace: Workspace) => {
      setWorkspaces((prev) => {
        const index = prev.findIndex((w) => w.id === workspace.id)

        if (index !== -1) {
          const temp = [...prev]
          temp[index] = workspace

          return temp
        }

        return [...prev, workspace]
      })
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    const { unsubscribe } = getBoards((board: Board) => {
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
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    const { unsubscribe } = getTasks((task: Task) => {
      setTasks((prev) => {
        const boardId = task.boardId

        if (!prev || !prev[boardId]) {
          return { ...prev, [boardId]: [task] }
        }

        const index = prev[boardId].findIndex((t) => t.id === task.id)

        if (index !== -1) {
          const temp = { ...prev }
          temp[boardId][index] = task

          return temp
        }

        return { ...prev, [boardId]: [...prev[boardId], task] }
      })
    })

    return () => {
      return unsubscribe()
    }
  }, [])

  return {
    workspaces: sortedWorkspaces,
    boards: sortedBoards,
    tasks: sortedTasks,
  }
}
