import {
  onAuthStateChanged as _onAuthStateChanged,
  signInWithEmailAndPassword,
  type User,
} from 'firebase/auth'

import { APIResponse } from '@/types'

import { auth } from '@/lib/firebase/client/config'

export const onAuthStateChanged = (cb: (user: User | null) => void) => {
  return _onAuthStateChanged(auth, cb)
}

export const signIn = async (email: string, password: string) => {
  try {
    const userCreds = await signInWithEmailAndPassword(auth, email, password)
    const token = await userCreds.user.getIdToken()

    const res = await fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })

    const resBody = (await res.json()) as APIResponse<string>

    return res.ok && resBody.status
  } catch (error) {
    console.log(
      '[FIREBASE_AUTH]: Fail to sign in with email and password -> ',
      error,
    )
    return false
  }
}

export const signOut = async () => {
  try {
    await auth.signOut()

    const res = await fetch('/api/auth/sign-out', {
      method: 'POST',
    })

    const resBody = (await res.json()) as APIResponse<string>

    return res.ok && resBody.status
  } catch (error) {
    console.log('[FIREBASE_AUTH]: Fail to sign out -> ', error)
    return false
  }
}
