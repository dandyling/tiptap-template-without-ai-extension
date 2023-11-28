import React, { HTMLProps } from 'react'

import { cn } from '@/lib/utils'

export type ToolbarProps = {
  shouldShowContent?: boolean
  isVertical?: boolean
} & HTMLProps<HTMLDivElement>

export const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  ({ shouldShowContent = true, children, isVertical = false, className, ...rest }, ref) => {
    const toolbarClassName = cn(
      'bg-white text-black inline-flex leading-none border border-neutral-200 shadow-sm rounded-lg gap-0.5',
      isVertical ? 'flex-col p-2' : 'flex-row p-1',
      className,
    )

    return (
      shouldShowContent && (
        <div className={toolbarClassName} ref={ref} {...rest}>
          {children}
        </div>
      )
    )
  },
)

Toolbar.displayName = 'Toolbar'

export type DividerProps = {
  horizontal?: boolean
} & HTMLProps<HTMLDivElement>

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(({ horizontal, className, ...rest }, ref) => {
  const dividerClassName = cn(
    'bg-black/10 my-0.5 first:mt-0 last:mb-0',
    horizontal ? 'w-full h-px' : 'h-full w-px',
    className,
  )

  return <div className={dividerClassName} ref={ref} {...rest} />
})

Divider.displayName = 'Toolbar.Divider'

export default Toolbar
