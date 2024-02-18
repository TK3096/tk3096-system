import { onSnapshot, collection, query } from 'firebase/firestore'

import { Workspace } from '@/types'

import { db } from '@/lib/firebase/client/config'

import { WORKSPACES_COLLECTION } from '@/lib/constant'

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
