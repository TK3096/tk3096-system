import { create } from 'zustand'

import { Workspace, Board } from '@/types'

export type ModalType =
  | 'createWorkspace'
  | 'editWorkspace'
  | 'createBoard'
  | 'editBoard'

export interface ModalData {
  workspace?: Workspace
  board?: Board
}

interface ModalStore {
  type: ModalType | null
  open: boolean
  data?: ModalData
  onOpen: (type: ModalType | null, data?: ModalData) => void
  onClose: () => void
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  open: false,
  onOpen: (type: ModalType | null, data?: ModalData) =>
    set({ open: true, type, data }),
  onClose: () => set({ open: false, type: null, data: undefined }),
}))
