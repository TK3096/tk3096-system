import { create } from 'zustand'

export type ModalType = 'createWorkspace'

export interface ModalData {}

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
