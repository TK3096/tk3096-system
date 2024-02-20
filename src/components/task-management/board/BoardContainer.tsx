import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

interface BoardContainerProps {
  children: React.ReactNode
}

export const BoardContainer = (props: BoardContainerProps) => {
  const { children } = props

  return (
    <ScrollArea>
      <div className='flex justify-center gap-4'>{children}</div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  )
}
