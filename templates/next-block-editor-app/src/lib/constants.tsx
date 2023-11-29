import { AiToneOption, LanguageOption } from '../components/BlockEditor/types'

export const languages: LanguageOption[] = [
  { name: 'english', label: 'English', value: 'en' as LanguageOption['value'] },
  { name: 'german', label: 'German', value: 'de' as LanguageOption['value'] },
  { name: 'spanish', label: 'Spanish', value: 'es' as LanguageOption['value'] },
  { name: 'italian', label: 'Italian', value: 'it' as LanguageOption['value'] },
  { name: 'french', label: 'French', value: 'fr' as LanguageOption['value'] },
  { name: 'swedish', label: 'Swedish', value: 'sv' as LanguageOption['value'] },
  { name: 'greek', label: 'Greek', value: 'gr' as LanguageOption['value'] },
]

export const embeds = {
  twitter: {
    regex: /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)(?:\?|\/|$)(\S+)?$/i,
  },
  youtube: {
    regex:
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|shorts\/|v\/)?)([\w-]+)(\S+)?$/i,
  },
  instagram: {
    regex: /^https?:\/\/(?:www\.)?instagram\.com\/(?:p|reel|reels)\/([^/?#&]+)(\S+)?$/i,
  },
  tiktok: {
    regex:
      /^(https?:\/\/)?(?:(?:www)\.(?:tiktok\.com)(?:\/)(?!foryou)(@[a-zA-Z0-9_.]+)(?:\/)(?:video)(?:\/)([\d]+)|(?:m)\.(?:tiktok\.com)(?:\/)(?!foryou)(?:v)(?:\/)?(?=([\d]+)\.html)|vm\.tiktok\.com(?:\/)([\S]+)(?:\/))(\S+)?$/i,
  },
  generic: { regex: /^(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?/i },
}

export enum EmbedService {
  YOUTUBE = 'youtube',
  INSTAGRAM = 'instagram',
  TWITTER = 'twitter',
  FRAMER = 'framer',
  FIGMA = 'figma',
}

export const tones: AiToneOption[] = [
  { name: 'academic', label: 'Academic', value: 'academic' },
  { name: 'business', label: 'Business', value: 'business' },
  { name: 'casual', label: 'Casual', value: 'casual' },
  { name: 'childfriendly', label: 'Childfriendly', value: 'childfriendly' },
  { name: 'conversational', label: 'Conversational', value: 'conversational' },
  { name: 'emotional', label: 'Emotional', value: 'emotional' },
  { name: 'humorous', label: 'Humorous', value: 'humorous' },
  { name: 'informative', label: 'Informative', value: 'informative' },
  { name: 'inspirational', label: 'Inspirational', value: 'inspirational' },
  { name: 'memeify', label: 'Memeify', value: 'meme' },
  { name: 'narrative', label: 'Narrative', value: 'narrative' },
  { name: 'objective', label: 'Objective', value: 'objective' },
  { name: 'persuasive', label: 'Persuasive', value: 'persuasive' },
  { name: 'poetic', label: 'Poetic', value: 'poetic' },
]

export const userNames = [
  'Lea Thompson',
  'Cyndi Lauper',
  'Tom Cruise',
  'Madonna',
  'Jerry Hall',
  'Joan Collins',
  'Winona Ryder',
  'Christina Applegate',
  'Alyssa Milano',
  'Molly Ringwald',
  'Ally Sheedy',
  'Debbie Harry',
  'Olivia Newton-John',
  'Elton John',
  'Michael J. Fox',
  'Axl Rose',
  'Emilio Estevez',
  'Ralph Macchio',
  'Rob Lowe',
  'Jennifer Grey',
  'Mickey Rourke',
  'John Cusack',
  'Matthew Broderick',
  'Justine Bateman',
  'Lisa Bonet',
]

export const userColors = ['#fb7185', '#fdba74', '#d9f99d', '#a7f3d0', '#a5f3fc', '#a5b4fc', '#f0abfc']

export const themeColors = ['#fb7185', '#fdba74', '#d9f99d', '#a7f3d0', '#a5f3fc', '#a5b4fc']
