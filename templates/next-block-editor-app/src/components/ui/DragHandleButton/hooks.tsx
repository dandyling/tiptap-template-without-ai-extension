import { Node } from '@tiptap/pm/model'
import { useState } from 'react'

export const useDragHandleData = () => {
  const [currentNode, setCurrentNode] = useState<Node | null>(null)
  const [currentNodePos, setCurrentNodePos] = useState<number>(-1)

  return {
    currentNode,
    currentNodePos,
    setCurrentNode,
    setCurrentNodePos,
  }
}
