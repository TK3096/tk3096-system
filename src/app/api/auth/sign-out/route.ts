import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { revokeAllSessions } from '@/lib/firebase/server/auth'
import { SESSION_KEY } from '@/lib/constant'

import { APIResponse } from '@/types'

export const GET = async () => {
  try {
    const sessionCookie = cookies().get(SESSION_KEY)?.value

    if (!sessionCookie) {
      return NextResponse.json<APIResponse>(
        {
          status: false,
          error: 'No session found',
        },
        { status: 400 },
      )
    }

    cookies().delete(SESSION_KEY)

    await revokeAllSessions(sessionCookie)

    return NextResponse.json<APIResponse<string>>({
      status: true,
      data: 'Sign out successfully',
    })
  } catch (error) {
    return NextResponse.json<APIResponse>(
      {
        status: false,
        error: `${error}`,
      },
      { status: 500 },
    )
  }
}
