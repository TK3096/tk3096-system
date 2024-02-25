import { Sidebar } from '@/components/palette/Sidebar'

const PalettesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
      <div className='hidden md:block h-full w-[250px] fixed inset-y-0 z-30'>
        <Sidebar />
      </div>
      <div className='md:pl-[250px] h-full'>{children}</div>
    </div>
  )
}

export default PalettesLayout
