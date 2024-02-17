import { NextRequest, NextResponse } from 'next/server'

import { SESSION_KEY } from '@/lib/constant'

export const middleware = (request: NextRequest) => {
  const session = request.cookies.get(SESSION_KEY)

  console.log(session)

  if (!session && request.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
}
