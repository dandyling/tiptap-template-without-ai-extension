import { cn } from '@/lib/utils'
import React from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'ghost'
export type ButtonSize = 'medium' | 'small' | 'icon' | 'iconSmall'

export type ButtonProps = {
  variant?: ButtonVariant
  active?: boolean
  buttonSize?: ButtonSize
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ active, buttonSize = 'medium', children, disabled, variant = 'primary', className, ...rest }, ref) => {
    const buttonClassName = cn(
      'flex group items-center justify-center border gap-2 text-sm font-semibold rounded-md disabled:opacity-50',

      variant === 'primary' &&
        cn(
          'text-white bg-black border-black',
          !disabled && !active && 'hover:bg-gray-800 active:bg-gray-900',
          active && 'bg-gray-900',
        ),

      variant === 'secondary' &&
        cn('text-gray-900', !disabled && !active && 'hover:bg-gray-100 active:bg-gray-200', active && 'bg-gray-200'),

      variant === 'tertiary' &&
        cn(
          'bg-gray-50 text-gray-900',
          !disabled && !active && 'hover:bg-gray-100 active:bg-gray-200',
          active && 'bg-gray-200',
        ),

      variant === 'ghost' &&
        cn(
          'bg-transparent border-transparent text-gray-500',
          !disabled && !active && 'hover:bg-black/5 hover:text-gray-700 active:bg-black/10 active:text-gray-800',
          active && 'bg-black/10 text-gray-800',
        ),

      buttonSize === 'medium' && 'py-2 px-3',
      buttonSize === 'small' && 'py-1 px-2',
      buttonSize === 'icon' && 'w-8 h-8',
      buttonSize === 'iconSmall' && 'w-6 h-6',

      className,
    )

    return (
      <button ref={ref} disabled={disabled} className={buttonClassName} {...rest}>
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
