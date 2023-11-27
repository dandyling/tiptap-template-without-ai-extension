import React, { ButtonHTMLAttributes, memo } from 'react'

import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Tooltip } from '../ui/Tooltip'

const title = 'Code'
const shortcut = ['Mod', 'E']

export type ToggleCodeButtonProps = {
  showTooltip?: boolean
  isActive?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export const ToggleCodeButton = memo(
  ({ showTooltip = false, onClick, disabled, isActive, ...rest }: ToggleCodeButtonProps): JSX.Element => {
    return (
      <Tooltip enabled={showTooltip && !disabled} title={title} shortcut={shortcut}>
        <Button active={isActive} variant="ghost" buttonSize="icon" onClick={onClick} disabled={disabled} {...rest}>
          <Icon name="Code2" />
        </Button>
      </Tooltip>
    )
  },
)

ToggleCodeButton.displayName = 'ToggleCodeButton'

export default ToggleCodeButton
