import { ContentHeader } from '@/components/palette/ContentHeader'
import { PaletteList } from '@/components/palette/PaletteList'

const PalettesPage = () => {
  return (
    <div className='h-full'>
      <div className='fixed w-full z-30'>
        <ContentHeader />
      </div>
      <div className='pt-16 px-4'>
        <PaletteList />
      </div>
    </div>
  )
}

export default PalettesPage
