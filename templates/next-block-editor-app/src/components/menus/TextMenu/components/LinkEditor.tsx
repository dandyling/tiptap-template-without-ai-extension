import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Surface } from '@/components/ui/Surface'
import { Toolbar } from '@/components/ui/Toolbar'
import * as Popover from '@radix-ui/react-popover'
import { useCallback, useMemo, useState } from 'react'

export type LinkEditorProps = {
  onSetLink: (link: string) => void
}

export const LinkEditor = ({ onSetLink }: LinkEditorProps) => {
  const [url, setUrl] = useState('')

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value)
  }, [])

  const isValidUrl = useMemo(() => /^(\S+):(\/\/)?\S+$/.test(url), [url])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (isValidUrl) {
        onSetLink(url)
      }
    },
    [url, isValidUrl, onSetLink],
  )

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Toolbar.Button tooltip="Set Link">
          <Icon name="Link" />
        </Toolbar.Button>
      </Popover.Trigger>
      <Popover.Content asChild>
        <Surface className="p-2">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <label className="flex items-center gap-2 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 cursor-text">
              <Icon name="Link" className="flex-none text-black dark:text-white" />
              <input
                type="url"
                className="flex-1 bg-transparent outline-none min-w-[12rem] text-black text-sm dark:text-white"
                placeholder="Enter URL"
                value={url}
                onChange={onChange}
              />
            </label>
            <Button variant="primary" buttonSize="small" type="submit" disabled={!isValidUrl}>
              Set Link
            </Button>
          </form>
        </Surface>
      </Popover.Content>
    </Popover.Root>
  )
}
