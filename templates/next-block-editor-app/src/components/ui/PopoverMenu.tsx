import * as Popover from '@radix-ui/react-popover'
import { ToolbarButton } from './ToolbarButton'
import { cn } from '@/lib/utils'
import { icons } from 'lucide-react'
import { forwardRef } from 'react'

export const Trigger = Popover.Trigger
export const Portal = Popover.Portal

export type MenuProps = {
  children: React.ReactNode
  trigger: React.ReactNode
  triggerClassName?: string
  customTrigger?: boolean
  isOpen?: boolean
  onOpenChange?: (state: boolean) => void
  withPortal?: boolean
  tooltip?: string
  isActive?: boolean
}

export const Menu = ({
  customTrigger,
  trigger,
  triggerClassName,
  children,
  isOpen,
  withPortal,
  tooltip,
  onOpenChange,
}: MenuProps) => {
  return (
    <Popover.Root onOpenChange={onOpenChange}>
      {customTrigger ? (
        <Trigger asChild>{trigger}</Trigger>
      ) : (
        <Trigger asChild>
          <ToolbarButton className={triggerClassName} tooltip={!isOpen ? tooltip : ''}>
            {trigger}
          </ToolbarButton>
        </Trigger>
      )}
      {withPortal ? (
        <Popover.Portal className="z-9999">
          <Popover.Content
            sideOffset={8}
            className="min-w-[15rem] p-2 bg-white rounded-lg shadow-sm border border-neutral-200 flex flex-col gap-0.5 max-h-80 overflow-auto z-[9999]"
          >
            {children}
          </Popover.Content>
        </Popover.Portal>
      ) : (
        <Popover.Content
          sideOffset={8}
          className="min-w-[15rem] p-2 bg-white rounded-xl border border-neutral-200 shadow-sm flex flex-col gap-0.5 max-h-80 overflow-auto"
        >
          {children}
        </Popover.Content>
      )}
    </Popover.Root>
  )
}

Menu.displayName = 'Menu'

export const Item = ({
  label,
  close = true,
  icon,
  iconComponent,
  disabled,
  onClick,
  isActive,
}: {
  label: string | React.ReactNode
  icon?: keyof typeof icons
  iconComponent?: React.ReactNode
  close?: boolean
  disabled?: boolean
  onClick: () => void
  isActive?: boolean
}) => {
  const className = cn(
    'flex items-center gap-2 p-1.5 text-sm font-medium text-neutral-500 text-left bg-transparent w-full rounded',
    !isActive && !disabled,
    'hover:bg-neutral-100 hover:text-neutral-800',
    isActive && !disabled && 'bg-neutral-100 text-neutral-800',
    disabled && 'text-neutral-400 cursor-not-allowed',
  )

  const IconComponent = icon ? icons[icon] : null
  const IconCustomComponent = iconComponent || null

  const ItemComponent = close ? Popover.Close : 'button'

  return (
    <ItemComponent className={className} onClick={onClick} disabled={disabled}>
      {IconComponent && <IconComponent className="w-4 h-4" />}
      {IconCustomComponent}
      {label}
    </ItemComponent>
  )
}

export type CategoryTitle = {
  children: React.ReactNode
}

export const CategoryTitle = ({ children }: CategoryTitle) => {
  return (
    <div className="mt-4 first:mt-1.5 mb-1.5 text-[0.625rem] font-medium text-neutral-400 uppercase select-none px-1">
      {children}
    </div>
  )
}

export const Divider = forwardRef<HTMLHRElement>((props, ref) => {
  return <hr {...props} ref={ref} className="my-1 border-neutral-200" />
})

Divider.displayName = 'Divider'
