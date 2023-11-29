'use client'

import React, { useRef, useState } from 'react'
import clsx from 'clsx'
import { EditorContent, PureEditorContent } from '@tiptap/react'
import { WebSocketStatus } from '@hocuspocus/provider'

import { DragHandleButton } from '../ui/DragHandleButton'
import { LinkMenu, TextMenu } from '@/components/menus'

import { useBlockEditor } from './hooks/useBlockEditor'

import '@/styles/index.css'

import { Spinner } from '../ui/Spinner'
import { SidebarPanel } from '../panels/SidebarPanel'
import { ToolbarButton } from '../ui/ToolbarButton'
import { Icon } from '../ui/Icon'
import { TiptapProps } from './types'
import { EditorInfo } from './components/EditorInfo'
import { ColumnsMenu } from '@/extensions/MultiColumn/menus'
import { TableColumnMenu, TableRowMenu } from '@/extensions/Table/menus'
import ImageBlockMenu from '@/extensions/ImageBlock/components/ImageBlockMenu'

export const BlockEditor = ({ hasCollab, ydoc, provider }: TiptapProps) => {
  const menuContainerRef = useRef(null)
  const editorRef = useRef<PureEditorContent | null>(null)
  const [hideTextMenu] = useState(false)

  const { editor, users, characterCount, collabState, leftSidebar } = useBlockEditor({ hasCollab, ydoc, provider })

  const displayedUsers = users.slice(0, 3)

  if (!editor) {
    return null
  }

  return (
    <div className="flex h-full">
      <SidebarPanel isOpen={leftSidebar.isOpen} onClose={leftSidebar.close} editor={editor} />
      <div className="relative flex flex-col flex-1 h-full overflow-hidden">
        <div className="flex flex-row items-center justify-between flex-none py-2 pl-6 pr-3 text-black bg-white border-b border-neutral-200">
          <div className="flex flex-row gap-x-1.5 items-center">
            <div className="flex items-center gap-x-1.5">
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
        <EditorContent editor={editor} ref={editorRef} className="flex-1 overflow-y-auto" />
        {collabState !== WebSocketStatus.Connected && (
          <div className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full text-gray-300 bg-white backdrop-blur-xl bg-opacity-10">
            <Spinner size={2} />
          </div>
        )}
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
      </div>
    </div>
  )
}

export default BlockEditor
