import * as Popover from '@radix-ui/react-popover'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Editor } from '@tiptap/react'
import { Divider } from '../../ui/Toolbar'
import { ToolbarButton } from '../../ui/ToolbarButton'
import { useCallback, useState } from 'react'
import { Icon } from '../../ui/Icon'

export const SubMenu = ({ editor }: { editor: Editor }) => {
  const [isOpen, setIsOpen] = useState(false)

  const onSuperscript = useCallback(() => {
    editor.chain().focus().toggleSuperscript().run()
  }, [editor])

  const onSubscript = useCallback(() => {
    editor.chain().focus().toggleSubscript().run()
  }, [editor])

  const isSubscript = editor.isActive('subscript')
  const isSuperscript = editor.isActive('superscript')

  const onAlignLeft = useCallback(() => editor.chain().focus().setTextAlign('left').run(), [editor])
  const onAlignCenter = useCallback(() => editor.chain().focus().setTextAlign('center').run(), [editor])
  const onAlignRight = useCallback(() => editor.chain().focus().setTextAlign('right').run(), [editor])
  const onAlignJustify = useCallback(() => editor.chain().focus().setTextAlign('justify').run(), [editor])

  const isAlignLeft = editor.isActive({ textAlign: 'left' })
  const isAlignCenter = editor.isActive({ textAlign: 'center' })
  const isAlignRight = editor.isActive({ textAlign: 'right' })
  const isAlignJustify = editor.isActive({ textAlign: 'justify' })

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <ToolbarButton tooltip={!isOpen ? 'More options' : undefined} className="data-[state=open]:bg-gray-100">
          <DotsHorizontalIcon className="block w-4 h-4" />
        </ToolbarButton>
      </Popover.Trigger>
      <Popover.Content
        className="flex items-stretch gap-1 p-1 bg-white rounded-lg shadow-2xl"
        side="top"
        sideOffset={8}
      >
        <ToolbarButton
          active={isSuperscript}
          tooltip="Superscript"
          tooltipShortcut={['Mod', '.']}
          onClick={onSuperscript}
        >
          <Icon name="Superscript" />
        </ToolbarButton>
        <ToolbarButton active={isSubscript} tooltip="Subscript" tooltipShortcut={['Mod', ',']} onClick={onSubscript}>
          <Icon name="Subscript" />
        </ToolbarButton>
        <Divider />
        <ToolbarButton
          active={isAlignLeft}
          tooltip="Align left"
          tooltipShortcut={['Shift', 'Mod', 'L']}
          onClick={onAlignLeft}
        >
          <Icon name="AlignLeft" />
        </ToolbarButton>
        <ToolbarButton
          active={isAlignCenter}
          tooltip="Align center"
          tooltipShortcut={['Shift', 'Mod', 'E']}
          onClick={onAlignCenter}
        >
          <Icon name="AlignCenter" />
        </ToolbarButton>
        <ToolbarButton
          active={isAlignRight}
          tooltip="Align right"
          tooltipShortcut={['Shift', 'Mod', 'R']}
          onClick={onAlignRight}
        >
          <Icon name="AlignRight" />
        </ToolbarButton>
        <ToolbarButton
          active={isAlignJustify}
          tooltip="Justify text"
          tooltipShortcut={['Shift', 'Mod', 'J']}
          onClick={onAlignJustify}
        >
          <Icon name="AlignJustify" />
        </ToolbarButton>
      </Popover.Content>
    </Popover.Root>
  )
}
