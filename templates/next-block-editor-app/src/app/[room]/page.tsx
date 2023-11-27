'use client'

import { TiptapCollabProvider } from '@hocuspocus/provider'
import { useSearchParams } from 'next/navigation'
import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import * as Y from 'yjs'
import 'iframe-resizer/js/iframeResizer.contentWindow'
import { Toaster } from 'react-hot-toast'

import { BlockEditor } from '@/components/BlockEditor'
import { EditorContext } from '@/components/BlockEditor/context/EditorContext'
import { Loader } from '@/components/BlockEditor/components/ui/Loader'

export interface AiState {
  isAiLoading: boolean
  aiError?: string | null
}

export default function Document({ params }: { params: { room: string } }) {
  // const translation = useAiTranslation('Hallo wie geht’s')
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false)
  const [aiError, setAiError] = useState<string | null>(null)

  const [provider, setProvider] = useState<TiptapCollabProvider | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const searchParams = useSearchParams()

  const hasCollab = parseInt(searchParams.get('noCollab') as string) !== 1
  const isDemo = parseInt(searchParams.get('demo') as string) === 1

  const { room } = params

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await (
        await fetch('/api/collab-auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ).json()

      const { token } = data

      // set state when the data received
      setToken(token)
    }

    dataFetch()
  }, [])

  const ydoc = useMemo(() => new Y.Doc(), [])

  useLayoutEffect(() => {
    if (hasCollab && token) {
      setProvider(
        new TiptapCollabProvider({
          name: `${process.env.NEXT_PUBLIC_CLOUD_PREFIX}${room}`,
          appId: process.env.NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID ?? '',
          token,
          document: ydoc,
        }),
      )
    }
  }, [setProvider, token, ydoc, room, hasCollab])

  const providerValue = useMemo(
    () => ({
      isAiLoading,
      aiError,
      setIsAiLoading,
      setAiError,
    }),
    [isAiLoading, aiError, setIsAiLoading, setAiError],
  )

  if (hasCollab && (!token || !provider)) return

  return (
    <EditorContext.Provider value={providerValue}>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          duration: 15000,
          style: {
            boxShadow: 'none',
          },
        }}
      />
      {isAiLoading && <Loader label="AI is now doing its job!" />}
      <div className="grid gap-6">
        <BlockEditor hasCollab={hasCollab} ydoc={ydoc} provider={provider} />
        <div className="grid gap-2 pb-6">
          {!isDemo ? (
            <div className="text-sm leading-normal text-center text-gray-800/70">
              Hit the Tab key <span className="px-1 rounded bg-white/40">⇥</span> to autocomplete or choose a command
              from the palette.
            </div>
          ) : null}
          <div className="max-w-xl mx-auto text-sm leading-normal text-center text-gray-800/70">
            In this demo, real people are collaborating in real time. The content is unmoderated. Be kind to each other
            and don&apos;t write anything offensive or prohibited. Thank you!
          </div>
        </div>
      </div>
    </EditorContext.Provider>
  )
}
