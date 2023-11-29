'use client'

import { TiptapCollabProvider } from '@hocuspocus/provider'
import 'iframe-resizer/js/iframeResizer.contentWindow'
import { useSearchParams } from 'next/navigation'
import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import * as Y from 'yjs'

import { BlockEditor } from '@/components/BlockEditor'

export interface AiState {
  isAiLoading: boolean
  aiError?: string | null
}

export default function Document({ params }: { params: { room: string } }) {
  const [provider, setProvider] = useState<TiptapCollabProvider | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const searchParams = useSearchParams()

  const hasCollab = parseInt(searchParams.get('noCollab') as string) !== 1

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

  if (hasCollab && (!token || !provider)) return

  return <BlockEditor hasCollab={hasCollab} ydoc={ydoc} provider={provider} />
}
