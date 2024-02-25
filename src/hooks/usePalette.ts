import { create } from 'zustand'

export type PaletteType = 'background' | 'text'

interface PaletteStore {
  type: PaletteType
  colors: string[]
  setType: (type: PaletteType) => void
  setColors: (colors: string[]) => void
}

export const usePalette = create<PaletteStore>((set) => ({
  type: 'background',
  colors: [],
  setType: (type: PaletteType) => set({ type }),
  setColors: (colors: string[]) => set({ colors }),
}))
