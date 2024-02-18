import { create } from 'zustand'

import { Workspace } from '@/types'

export type ModalType = 'createWorkspace' | 'editWorkspace'

export interface ModalData {
  workspace?: Workspace
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
