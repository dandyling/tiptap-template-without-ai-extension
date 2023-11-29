import { useContext, useEffect, useMemo, useState } from 'react'

import { useEditor } from '@tiptap/react'
import Ai from '@tiptap-pro/extension-ai'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import { TiptapCollabProvider, WebSocketStatus } from '@hocuspocus/provider'
import * as Y from 'yjs'

import { ExtensionKit } from '@/extensions/extension-kit'
import { EditorContext } from '../../../context/EditorContext'
import { userColors, userNames } from '../../../lib/constants'
import { randomElement } from '../../../lib/utils'
import { EditorUser } from '../types'
import { useSidebar } from '../../../hooks/useSidebar'

const TIPTAP_AI_BASE_URL = process.env.NEXT_PUBLIC_TIPTAP_AI_BASE_URL

export const useBlockEditor = ({
  hasCollab,
  ydoc,
  provider,
}: {
  hasCollab: boolean
  ydoc: Y.Doc
  provider?: TiptapCollabProvider | null | undefined
}) => {
  const leftSidebar = useSidebar()
  const [collabState, setCollabState] = useState<WebSocketStatus>(WebSocketStatus.Connecting)
  const { setIsAiLoading, setAiError } = useContext(EditorContext)

  const editor = useEditor(
    {
      autofocus: true,
      extensions: [
        ...ExtensionKit({
          usesCollaboration: hasCollab,
          provider,
        }),
        //
        ...(hasCollab
          ? [
              Collaboration.configure({
                document: ydoc,
              }),
              CollaborationCursor.configure({
                provider,
                user: {
                  name: randomElement(userNames),
                  color: randomElement(userColors),
                },
              }),
            ]
          : []),
        Ai.configure({
          appId: 'APP_ID_HERE',
          token: 'TOKEN_HERE',
          baseUrl: TIPTAP_AI_BASE_URL,
          autocompletion: true,
          onLoading: () => {
            setIsAiLoading(true)
            setAiError(null)
          },
          onSuccess: () => {
            setIsAiLoading(false)
            setAiError(null)
          },
          onError: error => {
            setIsAiLoading(false)
            setAiError(error.message)
          },
        }),
      ],
      editorProps: {
        attributes: {
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          class: 'min-h-full',
        },
      },
      ...(!hasCollab
        ? {
            content: `
      <p>
        How Tiptap is emerging as the widely accepted standard in text editing frameworks
      </p>
      <p>
        Tiptap is rapidly gaining popularity as the go-to choice for text editing frameworks because of its lightweight and user-friendly nature. With its intuitive API, developers can effortlessly build custom text editing components that are perfectly suited to their requirements. Additionally, its compatibility with popular frameworks like React and Vue makes it an excellent option for developers seeking a powerful and flexible text editor.
      </p>
      <p>
        Due to its constant progress and increasing number of users, Tiptap is becoming a vital element in contemporary web development.
      </p>
      <p>
        Introducing Tiptap AI as a native solution for seamless AI integration is simply the next natural progression.
      </p>
      <p>
        Let’s have a look at how Tiptap AI is revolutionizing the text editing experience and taking it to new heights.
      </p>
    `,
          }
        : {}),
    },
    [ydoc, provider, hasCollab],
  )

  const users = useMemo(() => {
    if (!editor?.storage.collaborationCursor?.users) {
      return []
    }

    return editor.storage.collaborationCursor?.users.map((user: EditorUser) => {
      const names = user.name?.split(' ')
      const firstName = names?.[0]
      const lastName = names?.[names.length - 1]
      const initials = `${firstName?.[0] || '?'}${lastName?.[0] || '?'}`

      return { ...user, initials: initials.length ? initials : '?' }
    })
  }, [editor?.storage.collaborationCursor?.users])

  const characterCount = editor?.storage.characterCount || { characters: () => 0, words: () => 0 }

  useEffect(() => {
    if (collabState !== WebSocketStatus.Connected) {
      editor?.setEditable(false)
      return
    }

    editor?.setEditable(true)
    return
  }, [collabState, editor])

  useEffect(() => {
    provider?.on('status', (event: { status: WebSocketStatus }) => {
      setCollabState(event.status)
    })
  }, [provider])

  return { editor, users, characterCount, collabState, leftSidebar }
}
