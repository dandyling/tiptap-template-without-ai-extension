'use client'

import { Editor as CoreEditor } from '@tiptap/core'
import { memo, useEffect, useState } from 'react'
import { TableOfContentStorage } from '@tiptap-pro/extension-table-of-content'
import { cn } from '@/lib/utils'

export type TableOfContentPanelProps = {
  editor: CoreEditor
  onItemClick?: () => void
}

export const TableOfContentPanel = memo(({ editor, onItemClick }: TableOfContentPanelProps) => {
  const [data, setData] = useState<TableOfContentStorage | null>(null)

  useEffect(() => {
    const handler = ({ editor: currentEditor }: { editor: CoreEditor }) => {
      setData({ ...currentEditor.extensionStorage.tableOfContent })
    }

    handler({ editor })

    editor.on('update', handler)
    editor.on('selectionUpdate', handler)

    return () => {
      editor.off('update', handler)
      editor.off('selectionUpdate', handler)
    }
  }, [editor])

  return (
    <>
      <div className="mb-2 text-xs font-semibold text-neutral-500 uppercase">Table of contents</div>
      {data && data.content.length > 0 ? (
        <div className="flex flex-col gap-1">
          {data.content.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              style={{ marginLeft: `${1 * item.level - 1}rem` }}
              onClick={onItemClick}
              className={cn(
                'block font-medium text-neutral-500 p-1 rounded bg-opacity-10 text-sm hover:text-neutral-800 transition-all hover:bg-black hover:bg-opacity-5 truncate w-full',
                item.isActive && 'text-neutral-800 bg-neutral-100',
              )}
            >
              {item.itemIndex}. {item.textContent}
            </a>
          ))}
        </div>
      ) : (
        <div className="text-sm text-neutral-500">Start adding headlines to your document …</div>
      )}
    </>
  )
})

TableOfContentPanel.displayName = 'TableOfContentPanel'
