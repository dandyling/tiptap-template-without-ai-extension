'use client'

import { useCallback } from 'react'
import { toast } from 'react-hot-toast'

export const CopyLinkButton = () => {
  const handleCopyToClipboard = useCallback(() => {
    navigator?.clipboard
      ?.writeText(window.location.href)
      .then(() => {
        toast('Link copied to clipboard ✨')
      })
      .catch(err => {
        console.error('Failed to copy url to clipboard:', err)
      })
  }, [])

  return (
    <button
      className="p-3 space-x-0 font-medium transition-colors bg-transparent rounded-lg cursor-pointer lg:space-x-2 hover:bg-transparency-box-5"
      onClick={handleCopyToClipboard}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="18" cy="5" r="3"></circle>
        <circle cx="6" cy="12" r="3"></circle>
        <circle cx="18" cy="19" r="3"></circle>
        <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line>
        <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
      </svg>
    </button>
  )
}
