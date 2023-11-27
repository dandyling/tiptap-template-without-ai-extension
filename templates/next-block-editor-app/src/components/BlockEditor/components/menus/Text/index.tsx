import { BubbleMenu as BaseBubbleMenu, isNodeSelection, posToDOMRect } from '@tiptap/react'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { Instance } from 'tippy.js'

import { Icon } from '../../ui/Icon'
import { Divider, Toolbar } from '../../ui/Toolbar'
import { MenuProps, ShouldShowProps } from '../types'
import { forceUpdateTippy } from '../utils/forceUpdateTippy'
import { isCustomNodeSelected } from '../utils/isCustomNodeSelected'
import { isTextSelected } from '../utils/isTextSelected'
import { SubMenu } from './SubMenu'
import { ColorPicker } from '../../toolbar/ColorPicker'
import { TextFormatting } from '../../toolbar/TextFormatting'
import { LinkEditor } from '../../toolbar/LinkEditor'
import { FontSizePicker } from '../../toolbar/FontSizePicker'
import { FontFamilyPicker } from '../../toolbar/FontFamilyPicker'
import { BlockPicker, BlockPickerOptions } from '../../toolbar/BlockPicker'
import { AIDropdown } from '../../toolbar/AIDropdown'
import { Language, Tone } from '@tiptap-pro/extension-ai'
import { ToolbarButton } from '../../ui/ToolbarButton'
import ToggleCodeButton from '../../toolbar/ToggleCodeButton'

export const TextMenu = ({ editor, shouldHide }: MenuProps): JSX.Element => {
  const tippyInstance = useRef<Instance | null>(null)

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

      if (node && node.getBoundingClientRect) {
        return node.getBoundingClientRect()
      }
    }

    return posToDOMRect(view, from, to)
  }, [editor])

  const shouldShow = useCallback(
    ({ view, from }: ShouldShowProps) => {
      if (shouldHide) {
        return false
      }

      if (!view) {
        return false
      }

      const domAtPos = view.domAtPos(from || 0).node as HTMLElement
      const nodeDOM = view.nodeDOM(from || 0) as HTMLElement
      const node = nodeDOM || domAtPos

      if (isCustomNodeSelected(editor, node)) {
        return false
      }

      return isTextSelected({ editor })
    },
    [editor, shouldHide],
  )

  const toggleBold = useCallback(() => editor.chain().toggleBold().focus().run(), [editor])
  const toggleItalic = useCallback(() => editor.chain().toggleItalic().focus().run(), [editor])
  const toggleUnderline = useCallback(() => editor.chain().toggleUnderline().focus().run(), [editor])
  const toggleStrikethrough = useCallback(() => editor.chain().toggleStrike().focus().run(), [editor])

  const handleSetLink = useCallback(
    (link: string) => {
      editor.chain().focus().extendMarkRange('link').setLink({ href: link }).run()
    },
    [editor],
  )

  const isBlockquoteFigure = editor.isActive('blockquoteFigure')

  const handleShorten = useCallback(() => editor.chain().aiShorten().focus().run(), [editor])
  const handleExtend = useCallback(() => editor.chain().aiExtend().focus().run(), [editor])
  const handleComplete = useCallback(() => editor.chain().aiComplete().focus().run(), [editor])
  const handleFixSpelling = useCallback(() => editor.chain().aiFixSpellingAndGrammar().focus().run(), [editor])
  const handleTldr = useCallback(() => editor.chain().aiTldr().focus().run(), [editor])
  const handleSummarize = useCallback(() => editor.chain().aiSummarize().focus().run(), [editor])
  const handleEmojify = useCallback(() => editor.chain().aiEmojify().focus().run(), [editor])
  const handleSimplify = useCallback(() => editor.chain().aiSimplify().focus().run(), [editor])
  const handleChangeLanguage = useCallback(
    (language: string) =>
      editor
        .chain()
        .aiTranslate(language as Language)
        .focus()
        .run(),
    [editor],
  )
  const handleChangeTone = useCallback(
    (tone: string) =>
      editor
        .chain()
        .aiAdjustTone(tone as Tone)
        .focus()
        .run(),
    [editor],
  )

  const handleSetCode = useCallback(() => {
    editor.chain().focus().toggleCode().run()
  }, [editor])

  const handleSetCodeBlock = useCallback(() => {
    editor.chain().focus().toggleCodeBlock().run()
  }, [editor])

  const blockPickerOptions = useMemo<BlockPickerOptions>(() => {
    return [
      {
        type: 'category',
        label: 'Hierarchy',
        id: 'hierarchy',
      },
      {
        icon: 'Pilcrow',
        onClick: () => editor.chain().focus().lift('taskItem').liftListItem('listItem').setParagraph().run(),
        id: 'paragraph',
        disabled: () => !editor.can().setParagraph(),
        isActive: () =>
          editor.isActive('paragraph') &&
          !editor.isActive('orderedList') &&
          !editor.isActive('bulletList') &&
          !editor.isActive('taskList'),
        label: 'Paragraph',
        type: 'option',
      },
      {
        icon: 'Heading1',
        onClick: () => editor.chain().focus().lift('taskItem').liftListItem('listItem').setHeading({ level: 1 }).run(),
        id: 'heading1',
        disabled: () => !editor.can().setHeading({ level: 1 }),
        isActive: () => editor.isActive('heading', { level: 1 }),
        label: 'Heading 1',
        type: 'option',
      },
      {
        icon: 'Heading2',
        onClick: () => editor.chain().focus().lift('taskItem').liftListItem('listItem').setHeading({ level: 2 }).run(),
        id: 'heading2',
        disabled: () => !editor.can().setHeading({ level: 2 }),
        isActive: () => editor.isActive('heading', { level: 2 }),
        label: 'Heading 2',
        type: 'option',
      },
      {
        icon: 'Heading3',
        onClick: () => editor.chain().focus().lift('taskItem').liftListItem('listItem').setHeading({ level: 3 }).run(),
        id: 'heading3',
        disabled: () => !editor.can().setHeading({ level: 3 }),
        isActive: () => editor.isActive('heading', { level: 3 }),
        label: 'Heading 3',
        type: 'option',
      },
      {
        type: 'category',
        label: 'Lists',
        id: 'lists',
      },
      {
        icon: 'List',
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        id: 'bulletList',
        disabled: () => !editor.can().toggleBulletList(),
        isActive: () => editor.isActive('bulletList'),
        label: 'Bullet list',
        type: 'option',
      },
      {
        icon: 'ListOrdered',
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        id: 'orderedList',
        disabled: () => !editor.can().toggleOrderedList(),
        isActive: () => editor.isActive('orderedList'),
        label: 'Numbered list',
        type: 'option',
      },
      {
        icon: 'ListTodo',
        onClick: () => editor.chain().focus().toggleTaskList().run(),
        id: 'todoList',
        disabled: () => !editor.can().toggleTaskList(),
        isActive: () => editor.isActive('taskList'),
        label: 'Todo list',
        type: 'option',
      },
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, editor.state])

  const handleFontSizeChange = useCallback(
    (size: string) => {
      if (!size || size === '') {
        return editor.chain().focus().unsetFontSize().run()
      }

      return editor.chain().focus().setFontSize(size).run()
    },
    [editor],
  )

  const handleFontFamilyChange = useCallback(
    (font: string) => {
      if (!font || font === '') {
        return editor.chain().focus().unsetFontFamily().run()
      }

      return editor.chain().focus().setFontFamily(font).run()
    },
    [editor],
  )

  const handleColorChange = useCallback(
    (color: string) => {
      const isCorrectColor = /^#([0-9A-F]{3}){1,2}$/i.test(color)
      if (!isCorrectColor && color !== undefined && color !== '') {
        return false
      }

      return editor.chain().focus().setColor(color).run()
    },
    [editor],
  )

  const handleHighlightChange = useCallback(
    (color: string) => {
      if (!color) {
        return editor.chain().focus().unsetHighlight().run()
      }
      const isCorrectColor = /^#([0-9A-F]{3}){1,2}$/i.test(color)
      if (!isCorrectColor && color !== undefined && color !== '') {
        return false
      }

      return editor.chain().focus().setHighlight({ color }).run()
    },
    [editor],
  )

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const textMenuIsVisible = shouldShow({ view: editor.view, from: editor.state.selection.from })

      if (textMenuIsVisible && (event.metaKey || event.ctrlKey) && event.key === 'k') {
        return true
      }

      return false
    },
    [editor.state.selection.from, editor.view, shouldShow],
  )

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown])

  if (tippyInstance.current) {
    forceUpdateTippy(tippyInstance.current, getReferenceClientRect)
  }

  const content = (
    <Toolbar>
      <AIDropdown
        onCompleteSentence={handleComplete}
        onEmojify={handleEmojify}
        onExtend={handleExtend}
        onFixSpelling={handleFixSpelling}
        onShorten={handleShorten}
        onSimplify={handleSimplify}
        onTldr={handleTldr}
        onChangeLanguage={handleChangeLanguage}
        onChangeTone={handleChangeTone}
        onSummarize={handleSummarize}
      />
      <Divider />
      {!isBlockquoteFigure && (
        <>
          <BlockPicker options={blockPickerOptions} />
          {editor.can().setFontFamily('Arial') && (
            <FontFamilyPicker onChange={handleFontFamilyChange} value={editor.getAttributes('textStyle').fontFamily} />
          )}
          {editor.can().setFontSize('16px') && (
            <FontSizePicker onChange={handleFontSizeChange} value={editor.getAttributes('textStyle').fontSize} />
          )}
          <Divider />
        </>
      )}
      <TextFormatting
        toggleBold={toggleBold}
        toggleItalic={toggleItalic}
        toggleUnderline={toggleUnderline}
        toggleStrikethrough={toggleStrikethrough}
        isBold={editor.isActive('bold')}
        isItalic={editor.isActive('italic')}
        isUnderline={editor.isActive('underline')}
        isStrikethrough={editor.isActive('strike')}
      />
      <LinkEditor onLinkChange={handleSetLink} />
      <ToggleCodeButton
        onClick={handleSetCode}
        isActive={editor.isActive('code')}
        disabled={!editor.can().toggleCode()}
        showTooltip
      />
      <ToolbarButton onClick={handleSetCodeBlock} active={editor.isActive('codeBlock')}>
        <Icon name="SquareCode" />
      </ToolbarButton>
      <Divider />
      <ColorPicker
        tooltip="Highlight text"
        color={editor.getAttributes('highlight')?.color}
        onColorChange={handleHighlightChange}
      >
        <Icon name="Highlighter" />
      </ColorPicker>
      <ColorPicker
        tooltip="Text color"
        color={editor.getAttributes('textStyle')?.color}
        onColorChange={handleColorChange}
      >
        <Icon name="Palette" />
      </ColorPicker>
      {!isBlockquoteFigure && (
        <>
          <Divider />
          <div className="ml-1">
            <SubMenu editor={editor} />
          </div>
        </>
      )}
    </Toolbar>
  )

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey="textMenu"
      shouldShow={shouldShow}
      updateDelay={150}
      tippyOptions={{
        appendTo: () => document.body,
        getReferenceClientRect,
        placement: 'top-start',
        onCreate: (instance: Instance) => {
          tippyInstance.current = instance
        },
        zIndex: 9999,
        maxWidth: 'none',
      }}
    >
      {content}
    </BaseBubbleMenu>
  )
}

export default TextMenu
