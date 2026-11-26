/**
 * Site-wide copy and contact details.
 * The repository is public: only add contact details you are happy to publish.
 */

export interface ContactLink {
  label: string
  /** `null` renders the label as "to be confirmed" text instead of a link. */
  href: string | null
}

export const site = {
  name: 'Fernando Maycas',
  role: 'Sports Broadcast Design & Motion',
  heroLines: ['Sports.', 'Motion.', 'Broadcast.'],
  intro:
    'Independent creative designing sports broadcast systems, social content and film.',
  about: [
    'Fernando Maycas is an independent creative working across sports broadcast design, motion graphics, sports social content and audiovisual production.',
    'The focus is complete visual systems — openers, scoreboards, player cards, lineups, lower thirds and matchday content that hold together from the broadcast to social.',
  ],
  /** Placeholder until a public contact address is chosen. */
  email: null as string | null,
  links: [
    { label: 'Instagram', href: null },
    { label: 'LinkedIn', href: null },
    { label: 'Vimeo', href: null },
  ] satisfies ContactLink[],
}

export const nav = [
  { label: 'Broadcast', href: '#broadcast' },
  { label: 'Social', href: '#social' },
  { label: 'Film', href: '#film' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]
