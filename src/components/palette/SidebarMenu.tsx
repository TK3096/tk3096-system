'use client'

import { useEffect } from 'react'
import { type CheckedState } from '@radix-ui/react-checkbox'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'

import { PALETTES_DATA } from '@/lib/constant'

import { PaletteType, usePalette } from '@/hooks/usePalette'

export const SidebarMenu = () => {
  const { setType, setColors, colors } = usePalette()

  const handleChangeType = (value: PaletteType) => {
    setType(value)
  }

  const handleSelectColor = (checked: CheckedState, id: string) => {
    const newColors = [...colors]

    if (checked) {
      newColors.push(id)
    } else {
      const index = newColors.indexOf(id)
      newColors.splice(index, 1)
    }

    setColors(newColors)
  }

  useEffect(() => {
    const keys = Object.keys(PALETTES_DATA)

    setColors(keys)
  }, [setColors])

  return (
    <div className='flex flex-col h-full'>
      <ScrollArea className='flex-1 w-full'>
        <div className='space-y-5 px-4 py-2'>
          <div>
            <h4 className='font-semibold'>Filter</h4>
            <Separator className='h-[2px] bg-neutral-700 mt-2' />
          </div>

          <RadioGroup
            defaultValue='background'
            onValueChange={handleChangeType}
          >
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='background' id='bg' />
              <Label htmlFor='bg'>Background</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='text' id='text' />
              <Label htmlFor='text'>Text</Label>
            </div>
          </RadioGroup>

          <div className='space-y-2'>
            {Object.values(PALETTES_DATA).map((palette) => (
              <div key={palette.id} className='flex items-center gap-2'>
                <Checkbox
                  id={palette.id}
                  defaultChecked
                  onChange={(e) => console.log('change')}
                  onCheckedChange={(checked) =>
                    handleSelectColor(checked, palette.id)
                  }
                />
                <Label htmlFor={palette.id}>{palette.id}</Label>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
