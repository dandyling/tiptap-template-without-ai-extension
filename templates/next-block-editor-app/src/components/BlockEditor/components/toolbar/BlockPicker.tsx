import * as PopoverMenu from '../ui/PopoverMenu'
import { icons } from 'lucide-react'
import { memo, useMemo } from 'react'
import { Icon } from '../ui/Icon'

export type BlockPickerOption = {
  label: string
  id: string
  type: 'option'
  disabled: () => boolean
  isActive: () => boolean
  onClick: () => void
  icon: keyof typeof icons
}

export type BlockPickerCategory = {
  label: string
  id: string
  type: 'category'
}

export type BlockPickerOptions = Array<BlockPickerOption | BlockPickerCategory>

export type BlockPickerProps = {
  options: BlockPickerOptions
}

const isOption = (option: BlockPickerOption | BlockPickerCategory): option is BlockPickerOption =>
  option.type === 'option'
const isCategory = (option: BlockPickerOption | BlockPickerCategory): option is BlockPickerCategory =>
  option.type === 'category'

export const BlockPicker = memo(({ options }: BlockPickerProps) => {
  const activeItem = useMemo(() => options.find(option => option.type === 'option' && option.isActive()), [options])

  return (
    <PopoverMenu.Menu
      trigger={
        <>
          <Icon name={(activeItem?.type === 'option' && activeItem.icon) || 'Pilcrow'} />
          <Icon name="ChevronDown" className="w-2 h-2" />
        </>
      }
      isActive
      tooltip="Block type"
    >
      {options.map(option => {
        if (isOption(option)) {
          return (
            <PopoverMenu.Item
              key={option.id}
              label={option.label}
              icon={option.icon}
              onClick={option.onClick}
              isActive={option.isActive()}
            />
          )
        } else if (isCategory(option)) {
          return <PopoverMenu.CategoryTitle key={option.id}>{option.label}</PopoverMenu.CategoryTitle>
        }
      })}
    </PopoverMenu.Menu>
  )
})

BlockPicker.displayName = 'BlockPicker'
