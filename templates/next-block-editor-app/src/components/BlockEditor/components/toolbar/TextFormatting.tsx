import { memo } from 'react'
import { ToolbarButton } from '../ui/ToolbarButton'
import { Icon } from '../ui/Icon'

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
        <ToolbarButton tooltip="Bold" tooltipShortcut={['Mod', 'B']} onClick={toggleBold} active={isBold}>
          <Icon name="Bold" className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton tooltip="Italic" tooltipShortcut={['Mod', 'I']} onClick={toggleItalic} active={isItalic}>
          <Icon name="Italic" className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          tooltip="Underline"
          tooltipShortcut={['Mod', 'U']}
          onClick={toggleUnderline}
          active={isUnderline}
        >
          <Icon name="Underline" className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          tooltip="Strikethrough"
          tooltipShortcut={['Shift', 'Mod', 'X']}
          onClick={toggleStrikethrough}
          active={isStrikethrough}
        >
          <Icon name="Strikethrough" className="w-4 h-4" />
        </ToolbarButton>
      </>
    )
  },
)

TextFormatting.displayName = 'TextFormatting'
