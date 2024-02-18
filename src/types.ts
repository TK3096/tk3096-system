export type APIResponse<T = object> =
  | { status: true; data: T }
  | { status: false; error: string }

export interface WorkspaceWithBoard {
  [key: string]: Board[]
}

export interface Workspace {
  id: string
  name: string
  description: string
  createdAt: number
  updatedAt: number
}

export interface Board {
  id: string
  workspaceId: string
  name: string
  description: string
  createdAt: number
  updatedAt: number
}
