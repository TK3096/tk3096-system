import { NextRequest, NextResponse } from 'next/server'
import * as z from 'zod'

import { APIResponse } from '@/types'

import { editTaskSchema } from '@/schemas/tasks-management'

import { getCurrentUser } from '@/lib/firebase/server/auth'
import { updateDocument } from '@/lib/firebase/server/db'
import { TASKS_COLLECTION } from '@/lib/constant'
import { createTimestamp } from '@/lib/utils'

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { taskId: string } },
) => {
  try {
    const { taskId } = params
    const user = await getCurrentUser()
    const reqBody = (await req.json()) as z.infer<typeof editTaskSchema>

    if (!user) {
      return NextResponse.json<APIResponse>(
        {
          status: false,
          error: 'Unauthorized',
        },
        { status: 401 },
      )
    }

    if (!taskId) {
      return NextResponse.json<APIResponse>(
        {
          status: false,
          error: 'Task id missing',
        },
        { status: 400 },
      )
    }

    const updated = await updateDocument(TASKS_COLLECTION, taskId, {
      ...reqBody,
      updatedAt: createTimestamp(),
    })

    if (!updated) {
      return NextResponse.json<APIResponse>(
        {
          status: false,
          error: 'Fail to update task',
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
