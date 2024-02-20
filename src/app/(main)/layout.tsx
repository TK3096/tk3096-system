import { redirect } from 'next/navigation'

import { Sidebar } from '@/components/main/Sidebar'
import { isUserAuthenticated } from '@/lib/firebase/server/auth'

export const dynamic = 'force-dynamic'

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const isAuth = await isUserAuthenticated()

  if (!isAuth) {
    redirect('/login')
  }

  return (
    <div className='h-full'>
      <div className='hidden md:block h-full w-[80px] fixed inset-y-0 z-50'>
        <Sidebar />
      </div>
      <main className='h-full md:pl-[80px]'>{children}</main>
    </div>
  )
}

export default MainLayout
