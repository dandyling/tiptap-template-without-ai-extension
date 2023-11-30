import { Editor } from '@tiptap/core'
import { Node } from '@tiptap/pm/model'

import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'
import { Panel, PanelFooter, PanelSection } from '../../ui/Panel'
import useDragHandlePanel from './DragHandleMenu.hooks'

export const DragHandleMenu = ({
  editor,
  currentNode,
  currentNodePos,
}: {
  editor: Editor
  currentNode: Node | null
  currentNodePos: number
}) => {
  const { resetTextFormatting, duplicateNode, copyNodeToClipboard, deleteNode } = useDragHandlePanel(
    editor,
    currentNode,
    currentNodePos,
  )

  return (
    <div className="pointer-events-auto select-none" draggable="false">
      <Panel tabIndex={-1}>
        <PanelSection>
          <div className="flex flex-col gap-1">
            {!currentNode?.isAtom && (
              <Button variant="ghost" buttonSize="small" onClick={resetTextFormatting} className="justify-start w-full">
                <Icon name="RemoveFormatting" className="mr-1" />
                Clear formatting
              </Button>
            )}

            <Button variant="ghost" buttonSize="small" onClick={duplicateNode} className="justify-start w-full">
              <Icon name="Copy" className="mr-1" />
              Duplicate
            </Button>
            <Button variant="ghost" buttonSize="small" onClick={copyNodeToClipboard} className="justify-start w-full">
              <Icon name="Clipboard" className="mr-1" />
              Copy to clipboard
            </Button>
          </div>
        </PanelSection>
        <PanelFooter>
          <Button
            variant="ghost"
            buttonSize="small"
            onClick={deleteNode}
            className="justify-start w-full text-red-500 bg-transparent hover:text-red-600 hover:bg-red-500/10 dark:text-red-400 dark:hover:text-red-500 dark:hover:bg-red-500/10"
          >
            <Icon name="Trash" className="mr-1" />
            Remove
          </Button>
        </PanelFooter>
      </Panel>
    </div>
  )
}

export default DragHandleMenu
