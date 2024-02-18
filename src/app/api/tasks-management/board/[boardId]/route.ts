import { NextRequest, NextResponse } from 'next/server'
import * as z from 'zod'

import { APIResponse } from '@/types'

import { editBoardSchema } from '@/schemas/tasks-management'

import { getCurrentUser } from '@/lib/firebase/server/auth'
import { updateDocument } from '@/lib/firebase/server/db'
import { BOARDS_COLLECTION } from '@/lib/constant'
import { createTimestamp } from '@/lib/utils'

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { boardId: string } },
) => {
  try {
    const { boardId } = params
    const { searchParams } = new URL(req.url)
    const workspaceId = searchParams.get('workspaceId')
    const user = await getCurrentUser()
    const reqBody = (await req.json()) as z.infer<typeof editBoardSchema>

    if (!user) {
      return NextResponse.json<APIResponse>(
        {
          status: false,
          error: 'Unauthorized',
        },
        { status: 401 },
      )
    }

    if (!boardId) {
      return NextResponse.json<APIResponse>(
        {
          status: false,
          error: 'Board id missing',
        },
        { status: 400 },
      )
    }

    if (!workspaceId) {
      return NextResponse.json<APIResponse>(
        {
          status: false,
          error: 'Workspace id missing',
        },
        { status: 400 },
      )
    }

    const updated = await updateDocument(BOARDS_COLLECTION, boardId, {
      ...reqBody,
      updatedAt: createTimestamp(),
    })

    if (!updated) {
      return NextResponse.json<APIResponse>(
        {
          status: false,
          error: 'Fail to update board',
        },
        { status: 400 },
      )
    }

    return NextResponse.json<APIResponse<boolean>>(
      {
        status: true,
        data: updated,
      },
      { status: 200 },
    )
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
