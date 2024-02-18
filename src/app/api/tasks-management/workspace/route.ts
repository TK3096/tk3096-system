import { NextRequest, NextResponse } from 'next/server'
import * as z from 'zod'

import { APIResponse } from '@/types'

import { workspaceSchema } from '@/schemas/tasks-management'

import { getCurrentUser } from '@/lib/firebase/server/auth'
import { addDocument } from '@/lib/firebase/server/db'
import { WORKSPACES_COLLECTION } from '@/lib/constant'
import { createTimestamp } from '@/lib/utils'

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = (await req.json()) as z.infer<typeof workspaceSchema>
    const { name, description } = reqBody
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

    const id = await addDocument(WORKSPACES_COLLECTION, {
      name,
      description,
      createdAt: timestamp,
      updatedAt: timestamp,
    })

    if (!id) {
      return NextResponse.json<APIResponse>(
        {
          status: false,
          error: 'Fail to create workspace',
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
