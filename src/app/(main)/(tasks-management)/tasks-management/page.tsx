import { LayoutDashboard } from 'lucide-react'

const TasksManagementPage = () => {
  return (
    <div className='flex flex-col gap-4 justify-center items-center h-full'>
      <LayoutDashboard className='h-28 w-28 dark:text-neutral-400' />
      <div className='space-y-2 text-center'>
        <p className='font-bold text-xl'>Tasks Management</p>
        <p className='text-sm text-neutral-300'>
          Create workspace, board and task
        </p>
      </div>
    </div>
  )
}

export default TasksManagementPage
