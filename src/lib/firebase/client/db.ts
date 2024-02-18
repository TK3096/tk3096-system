import { onSnapshot, collection, query } from 'firebase/firestore'

import { Board, Task, Workspace } from '@/types'

import { db } from '@/lib/firebase/client/config'

import {
  BOARDS_COLLECTION,
  TASKS_COLLECTION,
  WORKSPACES_COLLECTION,
} from '@/lib/constant'

export const getWorkspaces = (cb: (value: Workspace) => void) => {
  const q = query(collection(db, WORKSPACES_COLLECTION))
  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.forEach((doc) => {
      const { name, description, createdAt, updatedAt } = doc.data()

      const transformedData = {
        id: doc.id,
        name,
        description,
        createdAt,
        updatedAt,
      }

      cb(transformedData)
    })
  })

  return { unsubscribe }
}

export const getBoards = (cb: (value: Board) => void) => {
  const q = query(collection(db, BOARDS_COLLECTION))
  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.forEach((doc) => {
      const { name, description, workspaceId, createdAt, updatedAt } =
        doc.data()

      const transformedData = {
        id: doc.id,
        name,
        description,
        workspaceId,
        createdAt,
        updatedAt,
      }

      cb(transformedData)
    })
  })

  return { unsubscribe }
}

export const getTasks = (cb: (value: Task) => void) => {
  const q = query(collection(db, TASKS_COLLECTION))
  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.forEach((doc) => {
      const {
        name,
        description,
        boardId,
        status,
        remarks,
        createdAt,
        updatedAt,
      } = doc.data()

      const transformedData: Task = {
        id: doc.id,
        boardId,
        name,
        description,
        status,
        remarks,
        createdAt,
        updatedAt,
      }

      cb(transformedData)
    })
  })

  return { unsubscribe }
}
