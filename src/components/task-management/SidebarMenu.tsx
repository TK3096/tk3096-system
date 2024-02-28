'use client'

import { useTasksManagement } from '@/hooks/useTasksManagement'

import { SidebarItem } from '@/components/task-management/SidebarItem'
import { ScrollArea } from '@/components/ui/scroll-area'

export const SidebarMenu = () => {
  const { workspaces, boards } = useTasksManagement()

  return (
    <div className='flex flex-col h-full'>
      <ScrollArea className='flex-1 w-full'>
        <div className='space-y-5 px-4 py-2'>
          {workspaces.map((workspace) => (
            <div key={workspace.id}>
              <SidebarItem
                workspace={workspace}
                boards={
                  boards && boards[workspace.id] ? boards[workspace.id] : []
                }
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
