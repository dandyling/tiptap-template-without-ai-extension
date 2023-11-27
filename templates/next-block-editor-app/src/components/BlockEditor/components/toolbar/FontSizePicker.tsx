import * as PopoverMenu from '../ui/PopoverMenu'
import { memo, useCallback, useState } from 'react'
import { Icon } from '../ui/Icon'

const FONT_SIZES = [
  { label: 'Smaller', value: '12px' },
  { label: 'Small', value: '14px' },
  { label: 'Medium', value: '' },
  { label: 'Large', value: '18px' },
  { label: 'Extra Large', value: '24px' },
]

export type FontSizePickerProps = {
  onChange: (value: string) => void // eslint-disable-line no-unused-vars
  value: string
}

export const FontSizePicker = memo(({ onChange, value }: FontSizePickerProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const currentValue = FONT_SIZES.find(size => size.value === value)

  return (
    <PopoverMenu.Menu
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      isActive={isOpen || !!currentValue?.value}
      tooltip="Font size"
      trigger={
        <>
          {currentValue?.label.split(' ')[0] || 'Medium'}
          <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} className="w-2 h-2" />
        </>
      }
    >
      {FONT_SIZES.length > 0 &&
        FONT_SIZES.map(size => (
          <FontSizePickerItem
            label={size.label}
            value={size.value}
            onSelect={onChange}
            isActive={size.value === value || (size.value === '' && !value)}
            key={`${size.label}_${size.value}`}
          />
        ))}
    </PopoverMenu.Menu>
  )
})

FontSizePicker.displayName = 'FontSizePicker'

const FontSizePickerItem = ({
  label,
  value,
  onSelect,
  isActive,
}: {
  label: string
  value: string
  onSelect: (value: string) => void // eslint-disable-line no-unused-vars
  isActive?: boolean
}) => {
  const handleSelect = useCallback(() => {
    onSelect(value)
  }, [onSelect, value])

  return <PopoverMenu.Item label={label} onClick={handleSelect} isActive={isActive} />
}
