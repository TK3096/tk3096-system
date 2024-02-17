'use client'

import { useRouter } from 'next/navigation'
import { LayoutList } from 'lucide-react'

import { ScrollArea } from '@/components/ui/scroll-area'
import { SidebarItem } from '@/components/main/SidebarItem'

const MENUS = [
  {
    title: 'Tasks Management',
    path: '/tasks-management',
    Icon: LayoutList,
  },
  {
    title: 'Tasks Management2',
    path: '/tasks-management',
    Icon: LayoutList,
  },
  {
    title: 'Tasks Management3',
    path: '/tasks-management',
    Icon: LayoutList,
  },
  {
    title: 'Tasks Management4',
    path: '/tasks-management',
    Icon: LayoutList,
  },
  {
    title: 'Tasks Management5',
    path: '/tasks-management',
    Icon: LayoutList,
  },
]

export const SidebarMenu = () => {
  const router = useRouter()

  const handleClickSidebarItem = (path: string) => {
    router.push(path)
  }

  return (
    <ScrollArea className='flex-1 w-full'>
      <div className='space-y-5'>
        {MENUS.map((menu) => (
          <div key={menu.title} className='flex justify-center'>
            <SidebarItem
              title={menu.title}
              Icon={menu.Icon}
              onClick={() => handleClickSidebarItem(menu.path)}
            />
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
