import React, { ButtonHTMLAttributes, HTMLProps, forwardRef } from 'react'

import { cn } from '@/lib/utils'
import { Surface } from './Surface'
import { Button, ButtonProps } from './Button'
import Tooltip from './Tooltip'

export type ToolbarWrapperProps = {
  shouldShowContent?: boolean
  isVertical?: boolean
} & HTMLProps<HTMLDivElement>

const ToolbarWrapper = forwardRef<HTMLDivElement, ToolbarWrapperProps>(
  ({ shouldShowContent = true, children, isVertical = false, className, ...rest }, ref) => {
    const toolbarClassName = cn(
      'text-black inline-flex leading-none gap-0.5',
      isVertical ? 'flex-col p-2' : 'flex-row p-1',
      className,
    )

    return (
      shouldShowContent && (
        <Surface className={toolbarClassName} {...rest} ref={ref}>
          {children}
        </Surface>
      )
    )
  },
)

ToolbarWrapper.displayName = 'Toolbar'

export type ToolbarDividerProps = {
  horizontal?: boolean
} & HTMLProps<HTMLDivElement>

const ToolbarDivider = forwardRef<HTMLDivElement, ToolbarDividerProps>(({ horizontal, className, ...rest }, ref) => {
  const dividerClassName = cn(
    'bg-neutral-200 my-0.5 first:mt-0 last:mb-0',
    horizontal ? 'w-full h-px' : 'h-full w-px',
    className,
  )

  return <div className={dividerClassName} ref={ref} {...rest} />
})

ToolbarDivider.displayName = 'Toolbar.Divider'

export type ToolbarButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean
  activeClassname?: string
  tooltip?: string
  tooltipShortcut?: string[]
  buttonSize?: ButtonProps['buttonSize']
  variant?: ButtonProps['variant']
}

const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  (
    { children, buttonSize = 'icon', variant = 'ghost', className, tooltip, tooltipShortcut, activeClassname, ...rest },
    ref,
  ) => {
    const buttonClass = cn('gap-1 min-w-[2rem] px-2 w-auto', className)

    const content = (
      <Button
        activeClassname={activeClassname}
        className={buttonClass}
        variant={variant}
        buttonSize={buttonSize}
        ref={ref}
        {...rest}
      >
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

export const Toolbar = {
  Wrapper: ToolbarWrapper,
  Divider: ToolbarDivider,
  Button: ToolbarButton,
}
