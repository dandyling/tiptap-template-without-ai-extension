import { cn } from '@/lib/utils'
import { memo, useCallback } from 'react'
import { Editor } from '@tiptap/react'
import { TableOfContentPanel } from './TableOfContentPanel'

export const SidebarPanel = memo(
  ({ editor, isOpen, onClose }: { editor: Editor; isOpen?: boolean; onClose: () => void }) => {
    const handlePotentialClose = useCallback(() => {
      if (window.innerWidth < 1024) {
        onClose()
      }
    }, [onClose])

    const windowClassName = cn(
      'absolute top-0 left-0 bg-white lg:bg-white/30 lg:backdrop-blur-xl h-full lg:h-auto lg:relative z-[999] w-0 duration-300 transition-all',
      isOpen && 'w-64 lg:mr-24',
    )

    return (
      <div className={windowClassName}>
        <div className="w-full h-full overflow-hidden">
          <div className="w-64 h-full p-6 overflow-auto">
            <TableOfContentPanel onItemClick={handlePotentialClose} editor={editor} />
          </div>
        </div>
      </div>
    )
  },
)

SidebarPanel.displayName = 'TableOfContentSidepanel'
