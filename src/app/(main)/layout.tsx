import { Sidebar } from '@/components/main/Sidebar'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
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
