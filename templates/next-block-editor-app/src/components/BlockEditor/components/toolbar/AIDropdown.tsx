import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Icon } from '../ui/Icon'
import * as PopoverMenu from '../ui/PopoverMenu'
import { languages, tones } from '@/components/BlockEditor/lib/constants'
import { AiToneOption, LanguageOption } from '@/components/BlockEditor/types'

const useAIDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentView, setCurrentView] = useState<'tone' | 'translate' | null>(null)

  useEffect(() => {
    if (!isOpen) {
      setCurrentView(null)
    }
  }, [isOpen])

  const onOpenTone = useCallback(() => setCurrentView('tone'), [])
  const onOpenTranslate = useCallback(() => setCurrentView('translate'), [])
  const onBack = useCallback(() => setCurrentView(null), [])

  return {
    isOpen,
    setIsOpen,
    currentView,
    setCurrentView,
    onOpenTone,
    onOpenTranslate,
    onBack,
  }
}

export type AIDropdownProps = {
  onShorten: () => void
  onExtend: () => void
  onSimplify: () => void
  onFixSpelling: () => void
  onTldr: () => void
  onEmojify: () => void
  onCompleteSentence: () => void
  onSummarize: () => void
  onChangeTone: (tone: string) => void // eslint-disable-line no-unused-vars
  onChangeLanguage: (language: string) => void // eslint-disable-line no-unused-vars
}

export type ToneItemProps = { tone: AiToneOption; onSelect: (tone: string) => void } // eslint-disable-line no-unused-vars

const ToneItem = memo(({ tone, onSelect }: ToneItemProps) => {
  const handleSelect = useCallback(() => {
    onSelect(tone.value)
  }, [tone, onSelect])

  return <PopoverMenu.Item label={tone.label} onClick={handleSelect} />
})

ToneItem.displayName = 'ToneItem'

export type LanguageItemProps = { language: LanguageOption; onSelect: (language: string) => void } // eslint-disable-line no-unused-vars

const LanguageItem = memo(({ language, onSelect }: LanguageItemProps) => {
  const handleSelect = useCallback(() => {
    onSelect(language.value)
  }, [language, onSelect])

  return <PopoverMenu.Item label={language.label} onClick={handleSelect} />
})

LanguageItem.displayName = 'LanguageItem'

export const AIDropdown = memo(
  ({
    onCompleteSentence,
    onChangeLanguage,
    onChangeTone,
    onEmojify,
    onExtend,
    onFixSpelling,
    onShorten,
    onSimplify,
    onTldr,
  }: AIDropdownProps) => {
    const { currentView, isOpen, setIsOpen, onBack, onOpenTone, onOpenTranslate } = useAIDropdown()

    const menuContent = useMemo(() => {
      switch (currentView) {
        case 'tone':
          return (
            <>
              <PopoverMenu.Item close={false} icon="ChevronLeft" label="Back" onClick={onBack} />
              <div className="flex flex-col max-h-[15rem] overflow-auto">
                {tones.map(tone => (
                  <ToneItem key={tone.value} tone={tone} onSelect={onChangeTone} />
                ))}
              </div>
            </>
          )

        case 'translate':
          return (
            <>
              <PopoverMenu.Item close={false} icon="ChevronLeft" label="Back" onClick={onBack} />
              <div className="flex flex-col max-h-[15rem] overflow-auto">
                {languages.map(language => (
                  <LanguageItem key={language.value} language={language} onSelect={onChangeLanguage} />
                ))}
              </div>
            </>
          )

        default:
          return (
            <>
              <PopoverMenu.Item onClick={onSimplify} icon="CircleSlash" label="Simplify" />
              <PopoverMenu.Item onClick={onFixSpelling} icon="Eraser" label="Fix spelling & grammar" />
              <PopoverMenu.Item onClick={onShorten} icon="ArrowLeftFromLine" label="Make shorter" />
              <PopoverMenu.Item onClick={onExtend} icon="ArrowRightFromLine" label="Make longer" />
              <PopoverMenu.Item
                onClick={onOpenTone}
                close={false}
                icon="Mic"
                label={
                  <>
                    Change tone
                    <Icon name="ChevronRight" className="w-4 h-4 ml-auto" />
                  </>
                }
              />
              <PopoverMenu.Item onClick={onTldr} icon="MoreHorizontal" label="Tl;dr:" />
              <PopoverMenu.Item onClick={onEmojify} icon="SmilePlus" label="Emojify" />
              <PopoverMenu.Item
                onClick={onOpenTranslate}
                close={false}
                icon="Languages"
                label={
                  <>
                    Translate
                    <Icon name="ChevronRight" className="w-4 h-4 ml-auto" />
                  </>
                }
              />
              <PopoverMenu.Item onClick={onCompleteSentence} icon="PenLine" label="Complete Sentence" />
            </>
          )
      }
    }, [
      currentView,
      onBack,
      onChangeLanguage,
      onChangeTone,
      onCompleteSentence,
      onEmojify,
      onExtend,
      onFixSpelling,
      onOpenTone,
      onOpenTranslate,
      onShorten,
      onSimplify,
      onTldr,
    ])

    return (
      <PopoverMenu.Menu
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        triggerClassName="text-fuchsia-700 hover:bg-fuchsia-100 hover:text-fuchsia-800"
        trigger={
          <>
            <Icon name="Sparkles" />
            AI Tools
            <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} className="w-2 h-2" />
          </>
        }
      >
        {menuContent}
      </PopoverMenu.Menu>
    )
  },
)

AIDropdown.displayName = 'AIDropdown'
