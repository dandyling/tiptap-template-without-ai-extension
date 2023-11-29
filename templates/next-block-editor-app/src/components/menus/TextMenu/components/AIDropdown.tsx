import { DropdownButton } from '@/components/ui/Dropdown'
import { Icon } from '@/components/ui/Icon'
import { Surface } from '@/components/ui/Surface'
import { Toolbar } from '@/components/ui/Toolbar'
import * as Dropdown from '@radix-ui/react-dropdown-menu'

export const AIDropdown = () => {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <Toolbar.Button
          className="text-purple-500 hover:text-purple-600 active:text-purple-600"
          activeClassname="text-purple-600 hover:text-purple-600"
        >
          <Icon name="Sparkles" className="mr-1" />
          AI Tools
          <Icon name="ChevronDown" className="w-2 h-2 ml-1" />
        </Toolbar.Button>
      </Dropdown.Trigger>
      <Dropdown.Content asChild>
        <Surface className="p-2 min-w-[10rem]">
          <Dropdown.Item asChild onClick={console.log}>
            <DropdownButton>
              <Icon name="CircleSlash" />
              Simplify
            </DropdownButton>
          </Dropdown.Item>
          <Dropdown.Item asChild onClick={console.log}>
            <DropdownButton>
              <Icon name="Eraser" />
              Fix spelling & grammar
            </DropdownButton>
          </Dropdown.Item>
          <Dropdown.Item asChild onClick={console.log}>
            <DropdownButton>
              <Icon name="ArrowLeftToLine" />
              Make shorter
            </DropdownButton>
          </Dropdown.Item>
          <Dropdown.Item asChild onClick={console.log}>
            <DropdownButton>
              <Icon name="ArrowRightToLine" />
              Make longer
            </DropdownButton>
          </Dropdown.Item>
          <Dropdown.Sub>
            <Dropdown.SubTrigger>
              <DropdownButton>
                <Icon name="Mic" />
                Change tone
                <Icon name="ChevronRight" className="w-4 h-4 ml-auto" />
              </DropdownButton>
            </Dropdown.SubTrigger>
            <Dropdown.SubContent>
              <Surface className="flex flex-col min-w-[15rem] p-2 max-h-[20rem] overflow-auto">
                <Dropdown.Item asChild onClick={console.log}>
                  <DropdownButton>Academic</DropdownButton>
                </Dropdown.Item>
                <Dropdown.Item asChild onClick={console.log}>
                  <DropdownButton>Business</DropdownButton>
                </Dropdown.Item>
                <Dropdown.Item asChild onClick={console.log}>
                  <DropdownButton>Casual</DropdownButton>
                </Dropdown.Item>
                <Dropdown.Item asChild onClick={console.log}>
                  <DropdownButton>Childfriendly</DropdownButton>
                </Dropdown.Item>
                <Dropdown.Item asChild onClick={console.log}>
                  <DropdownButton>Conversational</DropdownButton>
                </Dropdown.Item>
                <Dropdown.Item asChild onClick={console.log}>
                  <DropdownButton>Emotional</DropdownButton>
                </Dropdown.Item>
                <Dropdown.Item asChild onClick={console.log}>
                  <DropdownButton>Humorous</DropdownButton>
                </Dropdown.Item>
                <Dropdown.Item asChild onClick={console.log}>
                  <DropdownButton>Informative</DropdownButton>
                </Dropdown.Item>
                <Dropdown.Item asChild onClick={console.log}>
                  <DropdownButton>Inspirational</DropdownButton>
                </Dropdown.Item>
                <Dropdown.Item asChild onClick={console.log}>
                  <DropdownButton>Memeify</DropdownButton>
                </Dropdown.Item>
                <Dropdown.Item asChild onClick={console.log}>
                  <DropdownButton>Narrative</DropdownButton>
                </Dropdown.Item>
                <Dropdown.Item asChild onClick={console.log}>
                  <DropdownButton>Objective</DropdownButton>
                </Dropdown.Item>
                <Dropdown.Item asChild onClick={console.log}>
                  <DropdownButton>Persuasive</DropdownButton>
                </Dropdown.Item>
                <Dropdown.Item asChild onClick={console.log}>
                  <DropdownButton>Poetic</DropdownButton>
                </Dropdown.Item>
              </Surface>
            </Dropdown.SubContent>
          </Dropdown.Sub>
          <Dropdown.Item asChild onClick={console.log}>
            <DropdownButton>
              <Icon name="MoreHorizontal" />
              Tl;dr:
            </DropdownButton>
          </Dropdown.Item>
          <Dropdown.Item asChild onClick={console.log}>
            <DropdownButton>
              <Icon name="SmilePlus" />
              Emojify
            </DropdownButton>
          </Dropdown.Item>
          <Dropdown.Sub>
            <Dropdown.SubTrigger>
              <DropdownButton>
                <Icon name="Languages" />
                Translate
                <Icon name="ChevronRight" className="w-4 h-4 ml-auto" />
              </DropdownButton>
            </Dropdown.SubTrigger>
            <Dropdown.SubContent>
              <Surface className="flex flex-col min-w-[15rem] p-2 max-h-[20rem] overflow-auto">
                <Dropdown.Item asChild onClick={console.log}>
                  <DropdownButton>English</DropdownButton>
                </Dropdown.Item>
                <Dropdown.Item asChild onClick={console.log}>
                  <DropdownButton>German</DropdownButton>
                </Dropdown.Item>
                <Dropdown.Item asChild onClick={console.log}>
                  <DropdownButton>Spanish</DropdownButton>
                </Dropdown.Item>
                <Dropdown.Item asChild onClick={console.log}>
                  <DropdownButton>Italian</DropdownButton>
                </Dropdown.Item>
                <Dropdown.Item asChild onClick={console.log}>
                  <DropdownButton>French</DropdownButton>
                </Dropdown.Item>
                <Dropdown.Item asChild onClick={console.log}>
                  <DropdownButton>Swedish</DropdownButton>
                </Dropdown.Item>
                <Dropdown.Item asChild onClick={console.log}>
                  <DropdownButton>Greek</DropdownButton>
                </Dropdown.Item>
              </Surface>
            </Dropdown.SubContent>
          </Dropdown.Sub>
          <Dropdown.Item asChild onClick={console.log}>
            <DropdownButton>
              <Icon name="PenLine" />
              Complete sentence
            </DropdownButton>
          </Dropdown.Item>
        </Surface>
      </Dropdown.Content>
    </Dropdown.Root>
  )
}
