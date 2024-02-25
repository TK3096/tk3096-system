export const SESSION_KEY = process.env.SESSION_KEY as string

export const WORKSPACES_COLLECTION = 'workspaces'

export const BOARDS_COLLECTION = 'boards'

export const TASKS_COLLECTION = 'tasks'

export const PALETTES_DATA: {
  [key: string]: { id: string; levels: number[] }
} = {
  slate: {
    id: 'slate',
    levels: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  gray: {
    id: 'gray',
    levels: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  zinc: {
    id: 'zinc',
    levels: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  neutral: {
    id: 'neutral',
    levels: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  stone: {
    id: 'stone',
    levels: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  red: {
    id: 'red',
    levels: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  orange: {
    id: 'orange',
    levels: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  amber: {
    id: 'amber',
    levels: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  yellow: {
    id: 'yellow',
    levels: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  lime: {
    id: 'lime',
    levels: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  green: {
    id: 'green',
    levels: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  emerald: {
    id: 'emerald',
    levels: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  teal: {
    id: 'teal',
    levels: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  cyan: {
    id: 'cyan',
    levels: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  sky: {
    id: 'sky',
    levels: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  blue: {
    id: 'blue',
    levels: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  indigo: {
    id: 'indigo',
    levels: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  violet: {
    id: 'violet',
    levels: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  purple: {
    id: 'purple',
    levels: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  fuchsia: {
    id: 'fuchsia',
    levels: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  pink: {
    id: 'pink',
    levels: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  rose: {
    id: 'rose',
    levels: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
}
