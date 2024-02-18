'use client'

import { useEffect, useState } from 'react'

import { CreateWorkspaceModal } from '@/components/modal/CreateWorkspaceModal'
import { EditWorkspaceModal } from '@/components/modal/EditWorkspaceModal'

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
    </>
  )
}
