import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { createSessionCookie } from '@/lib/firebase/server/auth'
import { SESSION_KEY } from '@/lib/constant'

import { APIResponse } from '@/types'

export const POST = async (req: NextRequest) => {
  try {
    const expiresIn = 60 * 60 * 24 * 5 * 1000
    const reqBody = (await req.json()) as { token: string }
    const { token } = reqBody

    const sessionCookie = await createSessionCookie(token, { expiresIn })

    cookies().set(SESSION_KEY, sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    })

    return NextResponse.json<APIResponse<string>>({
      status: true,
      data: 'Sign in successfully',
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
