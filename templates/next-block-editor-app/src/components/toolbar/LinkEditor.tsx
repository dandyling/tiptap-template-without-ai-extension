import { FormEvent, memo, useCallback, useMemo, useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { Icon } from '../ui/Icon'
import { Button } from '../ui/Button'
import { Toolbar } from '../ui/Toolbar'

export type OnLinkChangeFn = (link: string) => void // eslint-disable-line no-unused-vars

const useLinkEditor = (onLinkChange: OnLinkChangeFn, link?: string) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLink, setCurrentLink] = useState(link)

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentLink(event.target.value)
  }, [])

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      e.stopPropagation()

      if (currentLink) {
        onLinkChange(currentLink)
      }
      setCurrentLink('')
    },
    [onLinkChange, currentLink],
  )

  const isValidUrl = useMemo(() => {
    const urlRegex = /^(?:(?:https?):\/\/)?(?:www\.)?[a-z0-9\-\.]{3,}\.[a-z]{2,}(?::[0-9]{1,5})?(?:\/[^\s]*)?$/i
    return urlRegex.test(currentLink || '')
  }, [currentLink])

  return {
    isOpen,
    setIsOpen,
    currentLink,
    setCurrentLink,
    handleChange,
    handleSubmit,
    isValidUrl,
  }
}

export type LinkEditorProps = {
  link?: string
  onLinkChange: OnLinkChangeFn
}

export const LinkEditor = memo(({ link, onLinkChange }: LinkEditorProps) => {
  const { currentLink, handleChange, handleSubmit, isOpen, isValidUrl, setIsOpen } = useLinkEditor(onLinkChange, link)

  return (
    <Popover.Root onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <Toolbar.Button active={isOpen} tooltip={!isOpen ? 'Link' : ''}>
          <Icon name="Link2" />
        </Toolbar.Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          asChild
          side="top"
          sideOffset={8}
          className="z-50 flex items-center overflow-hidden bg-white border border-neutral-200 rounded-lg shadow"
        >
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-center flex-none w-10 h-10">
              <Icon name="Link" className="w-4 h-4 text-neutral-500" />
            </div>
            <input
              className="flex-1 block h-10 py-2 text-sm outline-none"
              type="text"
              placeholder="Enter a Link"
              value={currentLink}
              onChange={handleChange}
            />
            <div className="pr-1">
              <Button variant="ghost" buttonSize="icon" type="submit" disabled={!currentLink || !isValidUrl}>
                <Icon name="Check" className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
})

LinkEditor.displayName = 'LinkEditor'
