import { ButtonHTMLAttributes, forwardRef } from 'react'
import Tooltip from './Tooltip'
import { Button, ButtonProps } from './Button'
import { cn } from '@/lib/utils'

export type ToolbarButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean
  tooltip?: string
  tooltipShortcut?: string[]
  buttonSize?: ButtonProps['buttonSize']
  variant?: ButtonProps['variant']
}

export const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ children, buttonSize = 'icon', variant = 'ghost', className, tooltip, tooltipShortcut, ...rest }, ref) => {
    const buttonClass = cn('gap-1 min-w-[2rem] px-2 w-auto', className)

    const content = (
      <Button className={buttonClass} variant={variant} buttonSize={buttonSize} ref={ref} {...rest}>
        {children}
      </Button>
    )

    if (tooltip) {
      return (
        <Tooltip title={tooltip} shortcut={tooltipShortcut}>
          {content}
        </Tooltip>
      )
    }

    return content
  },
)

ToolbarButton.displayName = 'ToolbarButton'
