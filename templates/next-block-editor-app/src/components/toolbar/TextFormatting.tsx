import { memo } from 'react'
import { Icon } from '../ui/Icon'
import { Toolbar } from '../ui/Toolbar'

export type TextFormattingProps = {
  isBold?: boolean
  toggleBold: () => void
  isItalic?: boolean
  toggleItalic: () => void
  isUnderline?: boolean
  toggleUnderline: () => void
  isStrikethrough?: boolean
  toggleStrikethrough: () => void
}

export const TextFormatting = memo(
  ({
    isBold,
    isItalic,
    toggleBold,
    toggleItalic,
    toggleUnderline,
    isUnderline,
    toggleStrikethrough,
    isStrikethrough,
  }: TextFormattingProps) => {
    return (
      <>
        <Toolbar.Button tooltip="Bold" tooltipShortcut={['Mod', 'B']} onClick={toggleBold} active={isBold}>
          <Icon name="Bold" className="w-4 h-4" />
        </Toolbar.Button>
        <Toolbar.Button tooltip="Italic" tooltipShortcut={['Mod', 'I']} onClick={toggleItalic} active={isItalic}>
          <Icon name="Italic" className="w-4 h-4" />
        </Toolbar.Button>
        <Toolbar.Button
          tooltip="Underline"
          tooltipShortcut={['Mod', 'U']}
          onClick={toggleUnderline}
          active={isUnderline}
        >
          <Icon name="Underline" className="w-4 h-4" />
        </Toolbar.Button>
        <Toolbar.Button
          tooltip="Strikethrough"
          tooltipShortcut={['Shift', 'Mod', 'X']}
          onClick={toggleStrikethrough}
          active={isStrikethrough}
        >
          <Icon name="Strikethrough" className="w-4 h-4" />
        </Toolbar.Button>
      </>
    )
  },
)

TextFormatting.displayName = 'TextFormatting'
