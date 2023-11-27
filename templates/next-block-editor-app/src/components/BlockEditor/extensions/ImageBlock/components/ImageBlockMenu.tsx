import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react'
import React, { useCallback, useRef } from 'react'
import { Instance, sticky } from 'tippy.js'
import { v4 as uuid } from 'uuid'

import { MenuProps } from '../../../components/menus/types'
import { getRenderContainer } from '../../../components/menus/utils/getRenderContainer'
import { Divider, Toolbar } from '../../../components/ui/Toolbar'
import { ToolbarButton } from '@/components/BlockEditor/components/ui/ToolbarButton'
import { Icon } from '@/components/BlockEditor/components/ui/Icon'
import { ImageBlockWidth } from './ImageBlockWidth'

export const ImageBlockMenu = ({ editor, appendTo }: MenuProps): JSX.Element => {
  const menuRef = useRef<HTMLDivElement>(null)
  const tippyInstance = useRef<Instance | null>(null)

  const getReferenceClientRect = useCallback(() => {
    const renderContainer = getRenderContainer(editor, 'node-imageBlock')
    const rect = renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0)

    return rect
  }, [editor])

  const shouldShow = useCallback(() => {
    const isActive = editor.isActive('imageBlock')

    return isActive
  }, [editor])

  const onAlignImageLeft = useCallback(() => {
    editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockAlign('left').run()
  }, [editor])

  const onAlignImageCenter = useCallback(() => {
    editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockAlign('center').run()
  }, [editor])

  const onAlignImageRight = useCallback(() => {
    editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockAlign('right').run()
  }, [editor])

  const onWidthChange = useCallback(
    (value: number) => {
      editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockWidth(value).run()
    },
    [editor],
  )

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey={`imageBlockMenu-${uuid()}`}
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
        getReferenceClientRect,
        onCreate: (instance: Instance) => {
          tippyInstance.current = instance
        },
        appendTo: () => {
          return appendTo?.current
        },
        plugins: [sticky],
        sticky: 'popper',
      }}
    >
      <Toolbar shouldShowContent={shouldShow()} ref={menuRef}>
        <ToolbarButton
          tooltip="Align image left"
          active={editor.isActive('imageBlock', { align: 'left' })}
          onClick={onAlignImageLeft}
        >
          <Icon name="AlignHorizontalDistributeStart" />
        </ToolbarButton>
        <ToolbarButton
          tooltip="Align image center"
          active={editor.isActive('imageBlock', { align: 'center' })}
          onClick={onAlignImageCenter}
        >
          <Icon name="AlignHorizontalDistributeCenter" />
        </ToolbarButton>
        <ToolbarButton
          tooltip="Align image right"
          active={editor.isActive('imageBlock', { align: 'right' })}
          onClick={onAlignImageRight}
        >
          <Icon name="AlignHorizontalDistributeEnd" />
        </ToolbarButton>
        <Divider />
        <ImageBlockWidth onChange={onWidthChange} value={parseInt(editor.getAttributes('imageBlock').width)} />
      </Toolbar>
    </BaseBubbleMenu>
  )
}

export default ImageBlockMenu
