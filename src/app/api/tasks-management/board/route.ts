import { NextRequest, NextResponse } from 'next/server'
import * as z from 'zod'

import { APIResponse } from '@/types'

import { createBoardSchema } from '@/schemas/tasks-management'

import { getCurrentUser } from '@/lib/firebase/server/auth'
import { addDocument } from '@/lib/firebase/server/db'
import { BOARDS_COLLECTION } from '@/lib/constant'
import { createTimestamp } from '@/lib/utils'

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = (await req.json()) as z.infer<typeof createBoardSchema>
    const { name, description, workspaceId } = reqBody
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json<APIResponse>(
        {
          status: false,
          error: 'Unauthorized',
        },
        { status: 401 },
      )
    }

    const timestamp = createTimestamp()

    const id = await addDocument(BOARDS_COLLECTION, {
      name,
      description,
      workspaceId,
      createdAt: timestamp,
      updatedAt: timestamp,
    })

    if (!id) {
      return NextResponse.json<APIResponse>(
        {
          status: false,
          error: 'Fail to create board',
        },
        { status: 400 },
      )
    }

    return NextResponse.json<APIResponse>(
      {
        status: true,
        data: {
          id,
        },
      },
      { status: 201 },
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
