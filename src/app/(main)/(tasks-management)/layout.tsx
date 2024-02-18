import { Sidebar } from '@/components/task-management/Sidebar'

const TasksManagementLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
      <div className='hidden md:block h-ful w-[250px] fixed inset-y-0 z-20 '>
        <Sidebar />
      </div>
      <main className='md:pl-[250px] h-full'>{children}</main>
    </div>
  )
}

export default TasksManagementLayout
