import { NextRequest, NextResponse } from 'next/server'
import * as z from 'zod'

import { APIResponse } from '@/types'

import { createTaskSchema } from '@/schemas/tasks-management'

import { getCurrentUser } from '@/lib/firebase/server/auth'
import { addDocument } from '@/lib/firebase/server/db'
import { createTimestamp } from '@/lib/utils'
import { TASKS_COLLECTION } from '@/lib/constant'

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = (await req.json()) as z.infer<typeof createTaskSchema>
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

    const docId = await addDocument(TASKS_COLLECTION, {
      ...reqBody,
      createdAt: timestamp,
      updatedAt: timestamp,
    })

    if (!docId) {
      return NextResponse.json<APIResponse>({
        status: false,
        error: 'Fail to create task',
      })
    }

    return NextResponse.json<APIResponse<{ id: string }>>({
      status: true,
      data: { id: docId },
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
