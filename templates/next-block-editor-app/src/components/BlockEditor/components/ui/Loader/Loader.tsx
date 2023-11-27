import { createPortal } from 'react-dom'

import { LoaderProps, LoadingWrapperProps } from './types'

const LoadingWrapper = ({ label }: LoadingWrapperProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 text-white bg-black rounded-lg shadow-2xl">
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect
          className="animate-[spinner] duration-1600 -delay-1600 ease-linear repeat-infinite"
          x="1"
          y="1"
          rx="1"
          width="10"
          height="10"
        />
        <rect
          className="animate-[spinner] duration-1600 -delay-1000 ease-linear repeat-infinite"
          x="1"
          y="1"
          rx="1"
          width="10"
          height="10"
        />
      </svg>
      {label && <p className="text-sm leading-tight text-white">{label}</p>}
    </div>
  )
}

export const Loader = ({ hasOverlay = true, label }: LoaderProps) => {
  return hasOverlay ? (
    createPortal(
      <div className="items-center justify-center bg-black/60 flex h-full w-full fixed top-0 left-0 select-none z-[9999]">
        <LoadingWrapper label={label} />
      </div>,
      document.body,
    )
  ) : (
    <LoadingWrapper label={label} />
  )
}

export default Loader
