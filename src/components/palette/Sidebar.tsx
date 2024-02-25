import { SidebarHeader } from '@/components/palette/SidebarHeader'
import { SidebarMenu } from '@/components/palette/SidebarMenu'

export const Sidebar = () => {
  return (
    <div className='h-full bg-neutral-900/60'>
      <SidebarHeader />
      <SidebarMenu />
    </div>
  )
}
