'use client'

import { usePalette } from '@/hooks/usePalette'

import { BackgroundItem } from '@/components/palette/BackgroundItem'

import { PALETTES_DATA } from '@/lib/constant'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { TextItem } from './TextItem'

export const PaletteList = () => {
  const { colors, type } = usePalette()

  return (
    <div className='space-y-3'>
      {colors.map((color) => (
        <div key={color} className='grid grid-cols-[5%_90%] items-center gap-5'>
          <p className='font-bold'>{color}</p>
          <ScrollArea>
            <div className='flex gap-3 items-center'>
              {PALETTES_DATA[color].levels.map((level) => (
                <div key={`${color}-${level}`} className='flex gap-2'>
                  {type === 'background' && (
                    <BackgroundItem color={color} level={level} />
                  )}
                  {type === 'text' && <TextItem color={color} level={level} />}
                </div>
              ))}
            </div>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </div>
      ))}
    </div>
  )
}
