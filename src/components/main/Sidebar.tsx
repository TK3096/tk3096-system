import { SignOutButton } from '@/components/auth/SignOutButtont'
import { Separator } from '@/components/ui/separator'
import { SidebarMenu } from '@/components/main/SidebarMenu'
import { ModeToggle } from '@/components/common/ModeToggle'

export const Sidebar = () => {
  return (
    <div className='dark:bg-[#262626] h-full flex flex-col py-2 items-center'>
      <ModeToggle />
      <Separator className='h-[2px] w-3/4 mx-auto bg-neutral-700 my-2' />
      <SidebarMenu />
      <Separator className='h-[2px] w-3/4 mx-auto bg-neutral-700 my-2' />
      <SignOutButton />
    </div>
  )
}
