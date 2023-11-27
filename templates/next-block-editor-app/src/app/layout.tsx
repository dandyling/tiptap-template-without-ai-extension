import './globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Inter } from 'next/font/google'

import 'cal-sans'
import Link from 'next/link'
import { TiptapLogo } from '@/components/TiptapLogo'
import { CopyLinkButton } from '@/components/ui/CopyLinkButton'
// import { Toaster } from '@/components/_ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://tiptap-demos-next.vercel.app'),
  title: 'Tiptap Demo',
  description:
    'Tiptap is a suite of open source content editing and real-time collaboration tools for developers building apps like Notion or Google Docs.',
  robots: 'noindex, nofollow',
  icons: [{ url: '/favicon.svg' }],
  twitter: {
    card: 'summary_large_image',
    site: '@tiptap_editor',
    creator: '@tiptap_editor',
  },
  openGraph: {
    title: 'Tiptap Demo',
    description:
      'Tiptap is a suite of open source content editing and real-time collaboration tools for developers building apps like Notion or Google Docs.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[url('/bg-gradient.jpg')] bg-cover h-full bg-fixed">
      <body className={inter.className}>
        <main className="flex flex-col h-full">
          <header className="flex flex-row items-center justify-between px-4 py-10 lg:px-10">
            <Link href="https://www.tiptap.dev/" target="_blank" rel="noopener noreferrer">
              <TiptapLogo className="w-40" />
            </Link>
            <CopyLinkButton />
          </header>
          <div className="container flex items-center justify-center px-4 grow lg:px-8">
            <div className="w-full max-w-5xl mx-auto">{children}</div>
          </div>
        </main>
        {/* <Toaster /> */}
        <Analytics />
      </body>
    </html>
  )
}
