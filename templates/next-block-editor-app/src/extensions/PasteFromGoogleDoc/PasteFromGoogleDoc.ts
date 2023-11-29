import { Extension } from '@tiptap/core'
import { Plugin } from '@tiptap/pm/state'

export const PasteFromGoogleDoc = Extension.create({
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          transformPastedHTML(html) {
            const parser = new DOMParser()
            const doc = parser.parseFromString(html, 'text/html')

            const googleDocsWrapper = doc.querySelector('[id^=docs-internal-guid-]')
            const isPastedFromGoogleDocs = !!googleDocsWrapper

            // If clipboard content is not related to Google Docs, do not transform anything
            if (!isPastedFromGoogleDocs) {
              return html
            }

            // Otherwise …
            // Replace following breaks on root level with a paragraph
            googleDocsWrapper?.querySelectorAll(':scope > br + br').forEach(breakElement => {
              breakElement.replaceWith(document.createElement('p'))
            })

            // Remove single breaks on root level
            googleDocsWrapper?.querySelectorAll(':scope > :not(br) + br').forEach(breakElement => {
              breakElement.remove()
            })

            // Remove all inline styles of links and their child elements, because Docs colors and underlines links
            googleDocsWrapper?.querySelectorAll(':scope a, :scope a *').forEach(linkElement => {
              linkElement.removeAttribute('style')
            })

            // Remove font specific styles as they cause confusion
            googleDocsWrapper?.querySelectorAll('[style]').forEach(styledElement => {
              const styledElementStyle = (styledElement as HTMLElement).style

              styledElementStyle.removeProperty('font-size')
              styledElementStyle.removeProperty('font-family')
            })

            // Remove default stylings
            const defaultStyles = [
              { name: 'background-color', value: 'transparent' },
              { name: 'font-weight', value: '400' },
              { name: 'font-style', value: 'normal' },
              { name: 'font-variant', value: 'normal' },
              { name: 'text-decoration', value: 'none' },
              { name: 'vertical-align', value: 'baseline' },
              { name: 'white-space', value: 'pre-wrap' },
              { name: 'color', value: '#000000' },
              { name: 'color', value: 'rgb(0, 0, 0)' },
            ]

            defaultStyles.forEach(defaultStyle => {
              googleDocsWrapper
                ?.querySelectorAll(`[style*="${defaultStyle.name}: ${defaultStyle.value}"]`)
                .forEach(element => {
                  ;(element as HTMLElement).style.removeProperty(defaultStyle.name)

                  if (!element.getAttribute('style')) {
                    element.removeAttribute('style')
                  }
                })
            })

            // Unwrap empty spans
            googleDocsWrapper?.querySelectorAll('span').forEach(span => {
              if (span.hasAttributes() === false) {
                const { parentNode } = span

                while (span.firstChild) {
                  parentNode?.insertBefore(span.firstChild, span)
                }

                parentNode?.removeChild(span)
              }
            })

            return googleDocsWrapper.innerHTML
          },
        },
      }),
    ]
  },
})

export default PasteFromGoogleDoc
