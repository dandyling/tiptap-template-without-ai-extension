import * as PopoverMenu from '../ui/PopoverMenu'
import { memo, useCallback, useState } from 'react'
import { Icon } from '../ui/Icon'

const FONT_FAMILY_GROUPS = [
  {
    label: 'Sans Serif',
    options: [
      { label: 'Inter', value: '' },
      { label: 'Arial', value: 'Arial' },
      { label: 'Helvetica', value: 'Helvetica' },
    ],
  },
  {
    label: 'Serif',
    options: [
      { label: 'Times New Roman', value: 'Times' },
      { label: 'Garamond', value: 'Garamond' },
      { label: 'Georgia', value: 'Georgia' },
    ],
  },
  {
    label: 'Monospace',
    options: [
      { label: 'Courier', value: 'Courier' },
      { label: 'Courier New', value: 'Courier New' },
    ],
  },
]

const FONT_FAMILIES = FONT_FAMILY_GROUPS.flatMap(group => [group.options]).flat()

export type FontFamilyPickerProps = {
  onChange: (value: string) => void // eslint-disable-line no-unused-vars
  value: string
}

export const FontFamilyPicker = memo(({ onChange, value }: FontFamilyPickerProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const currentValue = FONT_FAMILIES.find(size => size.value === value)

  return (
    <PopoverMenu.Menu
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      isActive={isOpen || !!currentValue?.value}
      tooltip="Font family"
      trigger={
        <>
          {currentValue?.label.split(' ')[0] || 'Inter'}
          <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} className="w-2 h-2" />
        </>
      }
    >
      {FONT_FAMILY_GROUPS.map(group => (
        <div className="mt-2.5 first:mt-0" key={group.label}>
          <PopoverMenu.CategoryTitle>{group.label}</PopoverMenu.CategoryTitle>
          {group.options.map(font => (
            <FontFamilyPickerItem
              label={font.label}
              value={font.value}
              onSelect={onChange}
              isActive={font.value === value || (font.value === '' && !value)}
              key={`${font.label}_${font.value}`}
            />
          ))}
        </div>
      ))}
    </PopoverMenu.Menu>
  )
})

FontFamilyPicker.displayName = 'FontFamilyPicker'

const FontFamilyPickerItem = ({
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

  return (
    <div style={{ fontFamily: value }}>
      <PopoverMenu.Item label={label} onClick={handleSelect} isActive={isActive} />
    </div>
  )
}
