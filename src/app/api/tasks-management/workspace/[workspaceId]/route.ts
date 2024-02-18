import { NextRequest, NextResponse } from 'next/server'
import * as z from 'zod'

import { APIResponse } from '@/types'

import { editWorkspaceSchema } from '@/schemas/tasks-management'

import { getCurrentUser } from '@/lib/firebase/server/auth'
import { updateDocument } from '@/lib/firebase/server/db'
import { WORKSPACES_COLLECTION } from '@/lib/constant'
import { createTimestamp } from '@/lib/utils'

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { workspaceId: string } },
) => {
  try {
    const { workspaceId } = params
    const user = await getCurrentUser()
    const reqBody = (await req.json()) as z.infer<typeof editWorkspaceSchema>

    if (!user) {
      return NextResponse.json<APIResponse>(
        {
          status: false,
          error: 'Unauthorized',
        },
        { status: 401 },
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

    const updated = await updateDocument(WORKSPACES_COLLECTION, workspaceId, {
      ...reqBody,
      updatedAt: createTimestamp(),
    })

    if (!updated) {
      return NextResponse.json<APIResponse>(
        {
          status: false,
          error: 'Fail to update workspace',
        },
        { status: 400 },
      )
    }

    return NextResponse.json<APIResponse<boolean>>({
      status: true,
      data: updated,
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
