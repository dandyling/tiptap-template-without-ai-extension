import React, { useCallback, useState } from 'react'

import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'

export const EditLink = ({
  link = '',
  onSetLink,
  onUnsetLink = () => null,
  onBack,
  autoFocus = true,
}: {
  link?: string
  onSetLink: (link: string) => void // eslint-disable-line no-unused-vars
  onUnsetLink?: () => void
  onBack: () => void
  autoFocus?: boolean
}) => {
  const [newLink, setNewLink] = useState(link)

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        if (link === newLink) {
          onBack()
        } else if (newLink?.length) {
          onSetLink(newLink.trim())
        } else {
          onUnsetLink()
        }

        return true
      }

      if (event.key === 'Escape') {
        onBack()

        return true
      }

      return false
    },
    [link, newLink, onBack, onSetLink, onUnsetLink],
  )

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setNewLink(event.target.value)
  }, [])

  const onReturn = useCallback(() => {
    if (link === newLink) {
      onBack()
    } else {
      onSetLink(newLink)
    }
  }, [link, newLink, onBack, onSetLink])

  return (
    <div className="flex items-center flex-1 min-w-[18rem] text-white">
      <span className="leading-[0] m-1.5 mr-0 text-black/60">
        <Icon name="Link" />
      </span>
      <input
        className="max-w-[25rem] bg-transparent border-0 caret-black text-black flex-1 text-sm font-medium leading-none outline-none px-2 focus:border-0 focus:shadow-none"
        type="text"
        value={newLink}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="Type or paste a link"
        autoFocus={autoFocus}
      />
      <Button variant="ghost" buttonSize="icon" onClick={onReturn}>
        <Icon name="Undo2" />
      </Button>
    </div>
  )
}

export default EditLink
