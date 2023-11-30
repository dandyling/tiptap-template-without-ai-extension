import Tippy from '@tippyjs/react'
import { Editor } from '@tiptap/core'
import { Node } from '@tiptap/pm/model'
import { DragHandle } from '@tiptap-pro/extension-drag-handle-react'
import { useCallback } from 'react'

import { Button } from '../Button'
import { useDragHandleData } from './hooks'
import { GripVerticalIcon, PlusIcon } from 'lucide-react'
import DragHandleMenu from '@/components/menus/DragHandleMenu'

export const DragHandleButton = ({ editor, appendTo }: { editor: Editor; appendTo?: React.RefObject<any> }) => {
  const { currentNode, currentNodePos, setCurrentNode, setCurrentNodePos } = useDragHandleData()

  const handleNodeChange = useCallback(
    ({ node, pos }: { node: Node | null; editor: Editor; pos: number }) => {
      if (node) {
        setCurrentNode(node)
      }

      setCurrentNodePos(pos)
    },
    [setCurrentNodePos, setCurrentNode],
  )

  const CurrentPanel = <DragHandleMenu editor={editor} currentNode={currentNode} currentNodePos={currentNodePos} />

  const onTippyShow = useCallback(() => {
    editor.commands.setMeta('lockDragHandle', true)
  }, [editor])

  const onTippyHide = useCallback(() => {
    editor.commands.setMeta('lockDragHandle', false)
  }, [editor])

  const onShow = useCallback((): false | void => {
    if (currentNodePos !== -1) {
      const currentNodeSize = currentNode?.nodeSize || 0
      const insertPos = currentNodePos + currentNodeSize
      const currentNodeIsEmptyParagraph = currentNode?.type.name === 'paragraph' && currentNode?.content?.size === 0
      const focusPos = currentNodeIsEmptyParagraph ? currentNodePos + 2 : insertPos + 2

      editor
        .chain()
        .command(({ dispatch, tr, state }) => {
          if (dispatch) {
            if (currentNodeIsEmptyParagraph) {
              tr.insertText('/', currentNodePos, currentNodePos + 1)
            } else {
              tr.insert(insertPos, state.schema.nodes.paragraph.create(null, [state.schema.text('/')]))
            }

            return dispatch(tr)
          }

          return true
        })
        .focus(focusPos)
        .run()
    }

    return false
  }, [currentNode?.content?.size, currentNode?.nodeSize, currentNode?.type.name, currentNodePos, editor])

  return (
    <DragHandle
      editor={editor}
      className="drag-handle"
      onNodeChange={handleNodeChange}
      tippyOptions={{
        offset: [-1, 16],
        zIndex: 99,
        appendTo: () => {
          return appendTo?.current
        },
      }}
    >
      <div className="flex">
        <Tippy onShow={onShow} trigger="click">
          <div>
            <Button buttonSize="icon" variant="ghost">
              <PlusIcon className="w-4 h-4" />
            </Button>
          </div>
        </Tippy>
        <Tippy
          offset={[0, 8]}
          placement="bottom-start"
          popperOptions={{
            modifiers: [
              {
                name: 'flip',
                enabled: false,
              },
            ],
          }}
          onShow={onTippyShow}
          onHide={onTippyHide}
          appendTo={document.body}
          trigger="click"
          content={CurrentPanel}
        >
          <div>
            <Button buttonSize="icon" variant="ghost">
              <GripVerticalIcon className="w-4 h-4" />
            </Button>
          </div>
        </Tippy>
      </div>
    </DragHandle>
  )
}

export default DragHandleButton
