export type APIResponse<T = object> =
  | { status: true; data: T }
  | { status: false; error: string }
