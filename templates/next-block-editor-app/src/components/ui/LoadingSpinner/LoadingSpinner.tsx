// import { Transition } from '@headlessui/react'
// import cx from 'classnames'
import React, { useEffect, useState } from 'react'

interface LoadingSpinnerProps {
  color?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  delay?: number
  visible?: boolean
}

const LoadingSpinner: React.FunctionComponent<LoadingSpinnerProps> = ({
  color,
  className,
  size = 'md',
  delay,
  visible = true,
}) => {
  const [show, setShow] = useState(visible && typeof delay === 'undefined')

  const SIZE_CLASSES = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  useEffect(() => {
    if (delay) {
      const timeout = setTimeout(() => {
        setShow(visible)
      }, delay)

      return () => clearTimeout(timeout)
    }

    return undefined
  }, [delay, visible])

  return (
    // <Transition
    //   show={show}
    //   enter="transition-opacity duration-200"
    //   enterFrom="opacity-0"
    //   enterTo="opacity-100"
    //   leave="transition-opacity duration-200"
    //   leaveFrom="opacity-100"
    //   leaveTo="opacity-0"
    // >
    <>
      <svg
        // className={cx('animate-spin', className, SIZE_CLASSES[size], `text-${color}`)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={4} fill="none" />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {/* </Transition> */}
    </>
  )
}

LoadingSpinner.defaultProps = {
  color: 'gray-900',
  className: undefined,
}

export default LoadingSpinner
