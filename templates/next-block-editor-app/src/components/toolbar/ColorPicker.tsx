import { memo, useCallback, useEffect, useState } from 'react'
import Tippy from '@tippyjs/react/headless'
import { Toolbar } from '../ui/Toolbar'
import { ColorButton } from '../ui/ColorButton'
import { HexColorPicker } from 'react-colorful'
import { Icon } from '../ui/Icon'
import Tooltip from '../ui/Tooltip'
import { themeColors } from '../../lib/constants'

const useColorPickerState = () => {
  const [colorPickerOpen, setColorPickerOpen] = useState(false)

  const showColorPicker = useCallback(() => {
    setColorPickerOpen(true)
  }, [])

  const hideColorPicker = useCallback(() => {
    setColorPickerOpen(false)
  }, [])

  const toggleColorPicker = useCallback(() => {
    setColorPickerOpen(prev => !prev)
  }, [])

  return {
    colorPickerOpen,
    setColorPickerOpen,
    showColorPicker,
    hideColorPicker,
    toggleColorPicker,
  }
}

export type ColorPickerProps = {
  children: React.ReactNode
  color?: string
  onColorChange?: (color: string) => void // eslint-disable-line no-unused-vars
  tooltip?: string
}

export const ColorPicker = memo(({ onColorChange, children, color, tooltip }: ColorPickerProps) => {
  const [colorInputValue, setColorInputValue] = useState(color || '')
  const state = useColorPickerState()

  const clearColor = useCallback(() => {
    if (onColorChange) {
      onColorChange('')
    }
  }, [onColorChange])

  const handleColorUpdate = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setColorInputValue(event.target.value)
  }, [])

  const handleColorChange = useCallback(() => {
    const isCorrectColor = /^#([0-9A-F]{3}){1,2}$/i.test(colorInputValue)

    if (!isCorrectColor) {
      if (onColorChange) {
        onColorChange('')
      }

      return
    }

    if (onColorChange) {
      onColorChange(colorInputValue)
    }
  }, [colorInputValue, onColorChange])

  useEffect(() => {
    setColorInputValue(color || '')
  }, [color])

  const renderTippyContent = useCallback(() => {
    return (
      <Toolbar.Wrapper>
        <div className="flex flex-col gap-2">
          <HexColorPicker className="w-full" color={color || ''} onChange={onColorChange} />
          <input
            type="text"
            className="w-full p-2 bg-white border border-gray-200 rounded focus:outline-1 focus:ring-0 focus:outline-gray-300"
            placeholder="#000000"
            value={colorInputValue}
            onChange={handleColorUpdate}
            onBlur={handleColorChange}
          />
          <div className="flex flex-wrap items-center gap-1 max-w-[15rem]">
            {themeColors.map(currentColor => (
              <ColorButton
                active={currentColor === color}
                color={currentColor}
                key={currentColor}
                onColorChange={onColorChange}
              />
            ))}
            <Toolbar.Button tooltip="Reset color to default" onClick={clearColor}>
              <Icon name="Undo" />
            </Toolbar.Button>
          </div>
        </div>
      </Toolbar.Wrapper>
    )
  }, [onColorChange, handleColorChange, handleColorUpdate, clearColor, colorInputValue, color])

  return (
    <Tippy
      render={renderTippyContent}
      onShow={state.showColorPicker}
      onHide={state.hideColorPicker}
      trigger="click"
      interactive
    >
      <div>
        <Tooltip title={!state.colorPickerOpen ? tooltip : ''}>
          <Toolbar.Button active={state.colorPickerOpen || !!color}>{children}</Toolbar.Button>
        </Tooltip>
      </div>
    </Tippy>
  )
})

ColorPicker.displayName = 'ColorPicker'
