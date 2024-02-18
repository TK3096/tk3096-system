import 'server-only'

import { type DocumentData } from 'firebase-admin/firestore'

import { db } from '@/lib/firebase/server/config'

export const addDocument = async (collection: string, data: DocumentData) => {
  try {
    const docRef = await db.collection(collection).add(data)

    return docRef.id
  } catch (error) {
    console.log('[FIREBASE_FIRESTORE]: Fail to add document -> ', error)
    return null
  }
}
