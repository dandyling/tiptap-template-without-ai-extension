import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import React from 'react'

import { Icon } from '@/components/BlockEditor/components/ui/Icon'

interface EmbedInputProps {
  node: Record<string, any>
}

export const EmbedInputView = ({ node: { attrs } }: EmbedInputProps) => {
  const service = attrs.service ?? undefined

  const iconClass = 'w-4 h-4 text-dark opacity-50'

  return (
    <NodeViewWrapper data-service={service} data-drag-handle>
      <div className="flex items-center gap-2 p-4 rounded-xl cursor-text bg-white/40">
        {!service && <Icon name="Link" className={iconClass} />}
        {service === 'figma' && <Icon name="Figma" className={iconClass} />}
        {service === 'framer' && <Icon name="Framer" className={iconClass} />}
        {service === 'instagram' && <Icon name="Instagram" className={iconClass} />}
        {service === 'twitter' && <Icon name="Twitter" className={iconClass} />}
        {service === 'youtube' && <Icon name="Youtube" className={iconClass} />}
        <NodeViewContent></NodeViewContent>
      </div>
    </NodeViewWrapper>
  )
}

export default EmbedInputView
