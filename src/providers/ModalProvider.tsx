'use client'

import { useEffect, useState } from 'react'

import { CreateWorkspaceModal } from '@/components/modal/CreateWorkspaceModal'
import { EditWorkspaceModal } from '@/components/modal/EditWorkspaceModal'
import { CreateBoardModal } from '@/components/modal/CreateBoardModal'

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <CreateWorkspaceModal />
      <EditWorkspaceModal />
      <CreateBoardModal />
    </>
  )
}
