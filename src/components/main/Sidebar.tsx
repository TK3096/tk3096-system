import { SignOutButton } from '@/components/auth/SignOutButtont'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'

export const Sidebar = () => {
  return (
    <div className='dark:bg-[#262626] h-full flex flex-col py-2 items-center'>
      <div>sidebar</div>
      <Separator className='h-[2px] w-3/4 mx-auto bg-neutral-700 my-2' />
      <ScrollArea className='flex-1 w-full'>
        <div>ww</div>
      </ScrollArea>
      <Separator className='h-[2px] w-3/4 mx-auto bg-neutral-700 my-2' />
      <SignOutButton />
    </div>
  )
}
