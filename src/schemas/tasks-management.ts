import * as z from 'zod'

import { TaskStatus } from '@/types'

export const createWorkspaceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string(),
})

export const editWorkspaceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string(),
})

export const createBoardSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  workspaceId: z.string().min(1, 'Workspace id is required'),
  description: z.string(),
})

export const editBoardSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  workspaceId: z.string().min(1, 'Workspace id is required'),
  description: z.string(),
})

export const createTaskSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  boardId: z.string().min(1, 'Board id is required'),
  status: z.enum([
    TaskStatus.TODO,
    TaskStatus.IN_PROGRESS,
    TaskStatus.REVIEW,
    TaskStatus.DONE,
  ]),
  remarks: z.array(z.string()),
})
