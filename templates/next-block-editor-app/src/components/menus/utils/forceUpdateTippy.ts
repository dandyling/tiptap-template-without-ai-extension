import { GetReferenceClientRect, Instance } from 'tippy.js'

export const forceUpdateTippy = (
  tippyInstance?: Instance,
  getReferenceClientRect: GetReferenceClientRect,
  timeout: number = 0,
) => {
  const repeatEvery = 50
  const startTime = Date.now()

  const interval = setInterval(() => {
    if (!tippyInstance) {
      clearInterval(interval)

      return
    }

    tippyInstance.setProps({
      getReferenceClientRect,
    })

    if (startTime + timeout <= Date.now()) {
      clearInterval(interval)
    }
  }, repeatEvery)
}

export default forceUpdateTippy
