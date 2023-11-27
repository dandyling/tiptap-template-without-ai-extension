'use client'

import React, { useRef, useState } from 'react'
import clsx from 'clsx'
import { EditorContent, PureEditorContent } from '@tiptap/react'
import { WebSocketStatus } from '@hocuspocus/provider'

import { DragHandleButton } from './components/ui/DragHandleButton'
import { LinkMenu, TextMenu } from './components/menus'
import { ColumnsMenu } from './extensions/MultiColumn/menus/ColumnsMenu'
import { TableColumnMenu, TableRowMenu } from './extensions/Table/menus'
import { ImageBlockMenu } from './extensions/ImageBlock/components/ImageBlockMenu'

import { useBlockEditor } from './useBlockEditor'

import './styles/index.css'

import { Spinner } from './components/ui/Spinner'
import { SidebarPanel } from './components/panels/SidebarPanel'
import { ToolbarButton } from './components/ui/ToolbarButton'
import { Icon } from './components/ui/Icon'
import { useSidebar } from './lib/hooks/useSidebar'
import { TiptapProps } from './types'
import { WindowDecorations } from './components/WindowDecorations'
import { EditorInfo } from './components/EditorInfo'

export const BlockEditor = ({ hasCollab, ydoc, provider }: TiptapProps) => {
  const menuContainerRef = useRef(null)
  const leftSidebar = useSidebar()
  const editorRef = useRef<PureEditorContent | null>(null)
  const [hideTextMenu] = useState(false)

  const { editor, users, characterCount, collabState } = useBlockEditor({ hasCollab, ydoc, provider })

  const editorWrapperClassNames = clsx('rounded-2xl', 'bg-editor-background/20', 'p-1.5', 'overflow-hidden')

  const displayedUsers = users.slice(0, 3)

  if (!editor) {
    return null
  }

  return (
    <div className={editorWrapperClassNames}>
      <div className="relative rounded-2xl bg-editor-background text-editor-foreground">
        <div className="flex flex-row items-center justify-between py-2 pl-6 pr-3 font-extrabold text-editor-foreground/40 text-xxs rounded-t-2xl bg-editor-background/30">
          <div className="flex flex-row gap-x-1.5 items-center">
            <WindowDecorations />
            <div className="flex items-center gap-x-1.5 ml-4">
              <ToolbarButton
                tooltip={leftSidebar.isOpen ? 'Close sidebar' : 'Open sidebar'}
                onClick={leftSidebar.toggle}
                active={leftSidebar.isOpen}
                className={leftSidebar.isOpen ? 'bg-transparent' : ''}
              >
                <Icon name={leftSidebar.isOpen ? 'PanelLeftClose' : 'PanelLeft'} />
              </ToolbarButton>
            </div>
          </div>
          <EditorInfo
            characters={characterCount.characters()}
            words={characterCount.words()}
            collabState={collabState}
            users={displayedUsers}
          />
        </div>

        <div className="overflow-hidden">
          {collabState === WebSocketStatus.Connected && (
            <div ref={menuContainerRef}>
              <DragHandleButton editor={editor} appendTo={menuContainerRef} />
              <LinkMenu editor={editor} appendTo={menuContainerRef} />
              <TextMenu editor={editor} appendTo={menuContainerRef} shouldHide={hideTextMenu} />
              <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
              <TableRowMenu editor={editor} appendTo={menuContainerRef} />
              <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
              <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
            </div>
          )}
          <div className="relative flex items-stretch">
            <SidebarPanel isOpen={leftSidebar.isOpen} onClose={leftSidebar.close} editor={editor} />
            <div className="flex-1 w-full">
              <EditorContent
                editor={editor}
                ref={editorRef}
                className="rounded-b-lg overflow-y-auto max-h-[34rem] min-h-[60vh]"
              />
            </div>
            {collabState !== WebSocketStatus.Connected && (
              <div className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full text-gray-300 bg-white backdrop-blur-xl bg-opacity-10">
                <Spinner size={2} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlockEditor
