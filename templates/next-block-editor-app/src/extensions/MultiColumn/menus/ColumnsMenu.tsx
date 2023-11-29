import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react'
import { useCallback } from 'react'
import { sticky } from 'tippy.js'
import { v4 as uuid } from 'uuid'

import { MenuProps } from '@/components/menus/types'
import { getRenderContainer } from '@/components/menus/utils/getRenderContainer'
import { Toolbar } from '@/components/ui/Toolbar'
import { ColumnLayout } from '../Columns'
import { ToolbarButton } from '@/components/ui/ToolbarButton'
import { Icon } from '@/components/ui/Icon'

export const ColumnsMenu = ({ editor, appendTo }: MenuProps) => {
  const getReferenceClientRect = useCallback(() => {
    const renderContainer = getRenderContainer(editor, 'columns')
    const rect = renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0)

    return rect
  }, [editor])

  const shouldShow = useCallback(() => {
    const isColumns = editor.isActive('columns')
    return isColumns
  }, [editor])

  const onColumnLeft = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.SidebarLeft).run()
  }, [editor])

  const onColumnRight = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.SidebarRight).run()
  }, [editor])

  const onColumnTwo = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.TwoColumn).run()
  }, [editor])

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey={`columnsMenu-${uuid()}`}
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
        getReferenceClientRect,
        appendTo: () => appendTo?.current,
        plugins: [sticky],
        sticky: 'popper',
      }}
    >
      <Toolbar>
        <ToolbarButton
          tooltip="Sidebar left"
          active={editor.isActive('columns', { layout: ColumnLayout.SidebarLeft })}
          onClick={onColumnLeft}
        >
          <Icon name="PanelLeft" />
        </ToolbarButton>
        <ToolbarButton
          tooltip="Two columns"
          active={editor.isActive('columns', { layout: ColumnLayout.TwoColumn })}
          onClick={onColumnTwo}
        >
          <Icon name="Columns" />
        </ToolbarButton>
        <ToolbarButton
          tooltip="Sidebar right"
          active={editor.isActive('columns', { layout: ColumnLayout.SidebarRight })}
          onClick={onColumnRight}
        >
          <Icon name="PanelRight" />
        </ToolbarButton>
      </Toolbar>
    </BaseBubbleMenu>
  )
}

export default ColumnsMenu
