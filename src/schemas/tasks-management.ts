import * as z from 'zod'

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
