export type APIResponse<T = object> =
  | { status: true; data: T }
  | { status: false; error: string }

export interface Workspace {
  id: string
  name: string
  description: string
  createdAt: number
  updatedAt: number
}
