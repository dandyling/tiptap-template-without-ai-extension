import { BubbleMenu as BaseBubbleMenu, isNodeSelection, posToDOMRect } from '@tiptap/react'
import React, { useCallback, useState } from 'react'

import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'
import { Divider, Toolbar } from '../../ui/Toolbar'
import { Tooltip } from '../../ui/Tooltip'
import { MenuProps } from '../types'
import { EditLink } from './EditLink'

export const LinkMenu = ({ editor, appendTo }: MenuProps): JSX.Element => {
  const [showEdit, setShowEdit] = useState(false)
  const getReferenceClientRect = useCallback(() => {
    const {
      view,
      state,
      state: {
        selection: { from, to },
      },
    } = editor

    if (isNodeSelection(state.selection)) {
      const node = view.nodeDOM(from) as HTMLElement

      if (node) {
        return node.getBoundingClientRect()
      }
    }

    return posToDOMRect(view, from, to)
  }, [editor])

  const shouldShow = useCallback(() => {
    const isActive = editor.isActive('link')

    return isActive
  }, [editor])

  const link = editor.getAttributes('link').href

  const onSetLink = useCallback(
    (url: string) => {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
      setShowEdit(false)
    },
    [editor],
  )

  const onUnsetLink = useCallback(() => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    setShowEdit(false)
    return null
  }, [editor])

  const onShowEdit = useCallback(() => {
    setShowEdit(true)
  }, [])

  const onHideEdit = useCallback(() => {
    setShowEdit(false)
  }, [])

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey="textMenu"
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
        getReferenceClientRect,
        appendTo: () => {
          return appendTo?.current
        },
        onHidden: () => {
          setShowEdit(false)
        },
      }}
    >
      <Toolbar shouldShowContent={shouldShow()}>
        <div className="flex max-w-[18rem]">
          {showEdit ? (
            <EditLink link={link} onSetLink={onSetLink} onUnsetLink={onUnsetLink} onBack={onHideEdit} />
          ) : (
            <>
              <span className="self-center text-black leading-[0] ml-1.5">
                <Icon name="Globe" />
              </span>
              <a
                className="self-center text-black flex-1 text-sm font-medium leading-none mx-2 max-w-[25rem] min-w-[10rem] overflow-hidden underline overflow-ellipsis whitespace-nowrap"
                href={link}
                title={link}
                target="_blank"
              >
                {link}
              </a>
              <div className="flex gap-1">
                <Tooltip title="Edit link">
                  <Button
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    variant="ghost"
                    buttonSize="icon"
                    onClick={onShowEdit}
                  >
                    <Icon name="Pencil" />
                  </Button>
                </Tooltip>
                <Divider />
                <Tooltip title="Remove link">
                  <Button
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    variant="ghost"
                    buttonSize="icon"
                    onClick={onUnsetLink}
                  >
                    <Icon name="Trash" />
                  </Button>
                </Tooltip>
              </div>
            </>
          )}
        </div>
      </Toolbar>
    </BaseBubbleMenu>
  )
}

export default LinkMenu
