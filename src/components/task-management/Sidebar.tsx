import { SidebarHeader } from '@/components/task-management/SidebarHeader'
import { SidebarMenu } from '@/components/task-management/SidebarMenu'

export const Sidebar = () => {
  return (
    <div className='h-full bg-neutral-900/60'>
      <SidebarHeader />
      <SidebarMenu />
    </div>
  )
}
