import { Editor } from '@tiptap/core'
import { Node } from '@tiptap/pm/model'

import { Section } from '../../../extensions'

export const nodeIsSection = (node: Node | null) => node?.type.name === Section.name

export const hasSelectionInNode = (editor: Editor, node: Node | null, pos: number) => {
  const {
    state: {
      selection,
      selection: { empty: hasNoSelection },
    },
  } = editor
  const nodeStartPos = pos

  if ((!nodeStartPos && nodeStartPos !== 0) || hasNoSelection) {
    return false
  }

  const { from: selectionStartPos, to: selectionEndPos } = selection
  const nodeEndPos = node?.nodeSize ? nodeStartPos + node.nodeSize : null

  if (
    nodeEndPos &&
    ((nodeStartPos >= selectionStartPos && nodeStartPos <= selectionEndPos) ||
      (nodeEndPos >= selectionStartPos && nodeEndPos <= selectionEndPos))
  ) {
    return true
  }

  return false
}

// Convert to section if it is not already one.
export const convertToSection = (editor: Editor, currentNode: Node | null, currentNodePos: number) => {
  if (!currentNode) {
    return false
  }

  const isSection = nodeIsSection(currentNode)

  if (!isSection) {
    // If there is a selection over multiple nodes …
    if (hasSelectionInNode(editor, currentNode, currentNodePos) || currentNodePos === -1) {
      // … set section to current selection …
      editor.commands.setSection()
    } else {
      // … otherwise set section to position of the currently hovered node.
      editor.chain().setNodeSelection(currentNodePos).setSection().run()
    }

    return editor.commands.selectParentNode()
  }

  return editor.commands.setNodeSelection(currentNodePos)
}
