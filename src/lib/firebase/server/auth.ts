import 'server-only'

import { cookies } from 'next/headers'
import { type SessionCookieOptions } from 'firebase-admin/auth'

import { auth } from '@/lib/firebase/server/config'

import { SESSION_KEY } from '@/lib/constant'

export const getSession = async () => {
  try {
    return cookies().get(SESSION_KEY)?.value
  } catch (error) {
    console.log('[FIREBASE_AUTH]: Fail to get session -> ', error)
    return undefined
  }
}

export const isUserAuthenticated = async (session?: string) => {
  const _session = session ?? (await getSession())

  if (!_session) {
    return false
  }

  try {
    const isRevoked = !(await auth.verifySessionCookie(_session, true))
    return !isRevoked
  } catch (error) {
    console.log('[FIREBASE_AUTH]: Fail to check user authenticated -> ', error)
    return false
  }
}

export const getCurrentUser = async () => {
  const session = await getSession()

  if (!(await isUserAuthenticated(session))) {
    return null
  }

  const decodedToken = await auth.verifySessionCookie(session!)
  const currentUser = await auth.getUser(decodedToken.uid)

  return currentUser
}

export const createSessionCookie = async (
  token: string,
  sessionCookieOptions: SessionCookieOptions,
) => {
  return auth.createSessionCookie(token, sessionCookieOptions)
}

export const revokeAllSessions = async (session: string) => {
  const decodedToken = await auth.verifySessionCookie(session)

  return await auth.revokeRefreshTokens(decodedToken.uid)
}
