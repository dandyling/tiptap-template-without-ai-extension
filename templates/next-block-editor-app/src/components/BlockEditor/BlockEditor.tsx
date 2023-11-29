'use client'

import { WebSocketStatus } from '@hocuspocus/provider'
import { EditorContent, PureEditorContent } from '@tiptap/react'
import React, { useMemo, useRef, useState } from 'react'

import { LinkMenu, TextMenu } from '@/components/menus'
import { DragHandleButton } from '@/components/ui/DragHandleButton'

import { useBlockEditor } from './hooks/useBlockEditor'

import '@/styles/index.css'

import { SidebarPanel } from '@/components/panels/SidebarPanel'
import { Loader } from '@/components/ui/Loader'
import { Spinner } from '@/components/ui/Spinner'
import { ToolbarButton } from '@/components/ui/ToolbarButton'
import { EditorContext } from '@/context/EditorContext'
import ImageBlockMenu from '@/extensions/ImageBlock/components/ImageBlockMenu'
import { ColumnsMenu } from '@/extensions/MultiColumn/menus'
import { TableColumnMenu, TableRowMenu } from '@/extensions/Table/menus'
import { useAIState } from '@/hooks/useAIState'
import { createPortal } from 'react-dom'
import { Icon } from '../ui/Icon'
import { EditorInfo } from './components/EditorInfo'
import { TiptapProps } from './types'
import { EditorHeader } from './components/EditorHeader'

export const BlockEditor = ({ hasCollab, ydoc, provider }: TiptapProps) => {
  const aiState = useAIState()
  const menuContainerRef = useRef(null)
  const editorRef = useRef<PureEditorContent | null>(null)
  const [hideTextMenu] = useState(false)

  const { editor, users, characterCount, collabState, leftSidebar } = useBlockEditor({ hasCollab, ydoc, provider })

  const displayedUsers = users.slice(0, 3)

  const providerValue = useMemo(() => {
    return {
      isAiLoading: aiState.isAiLoading,
      aiError: aiState.aiError,
      setIsAiLoading: aiState.setIsAiLoading,
      setAiError: aiState.setAiError,
    }
  }, [aiState])

  if (!editor) {
    return null
  }

  const aiLoaderPortal = createPortal(<Loader label="AI is now doing its job." />, document.body)

  return (
    <EditorContext.Provider value={providerValue}>
      <div className="flex h-full" ref={menuContainerRef}>
        <SidebarPanel isOpen={leftSidebar.isOpen} onClose={leftSidebar.close} editor={editor} />
        <div className="relative flex flex-col flex-1 h-full overflow-hidden">
          <EditorHeader
            characters={characterCount.characters()}
            collabState={collabState}
            users={displayedUsers}
            words={characterCount.words()}
            isSidebarOpen={leftSidebar.isOpen}
            toggleSidebar={leftSidebar.toggle}
          />
          <EditorContent editor={editor} ref={editorRef} className="flex-1 overflow-y-auto" />
          {collabState !== WebSocketStatus.Connected && (
            <div className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full text-gray-300 bg-white backdrop-blur-xl bg-opacity-10">
              <Spinner size={2} />
            </div>
          )}
          {collabState === WebSocketStatus.Connected && (
            <>
              <DragHandleButton editor={editor} appendTo={menuContainerRef} />
              <LinkMenu editor={editor} appendTo={menuContainerRef} />
              <TextMenu editor={editor} appendTo={menuContainerRef} shouldHide={hideTextMenu} />
              <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
              <TableRowMenu editor={editor} appendTo={menuContainerRef} />
              <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
              <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
            </>
          )}
        </div>
      </div>
      {aiState.isAiLoading && aiLoaderPortal}
    </EditorContext.Provider>
  )
}

export default BlockEditor
