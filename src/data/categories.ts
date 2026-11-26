import type { Category, CategoryId } from './types'

export const categories: Category[] = [
  {
    id: 'broadcast',
    name: 'Broadcast Design',
    shortName: 'Broadcast',
    description: 'Complete on-air graphics systems for leagues, competitions and clubs.',
    disciplines: [
      'Broadcast packages',
      'Competition openers',
      'Player cards',
      'Lineups',
      'Scoreboards',
      'Lower thirds',
    ],
  },
  {
    id: 'social',
    name: 'Sports Social Content',
    shortName: 'Social',
    description: 'Story-driven social content built for matchday pace.',
    disciplines: [
      'Instagram Stories',
      'Matchday graphics',
      'Player announcements',
      'Sports campaigns',
      'Animated social graphics',
    ],
  },
  {
    id: 'film',
    name: 'Filmmaking & Editing',
    shortName: 'Film',
    description: 'Story-led edits from the stands, the pitch and behind the scenes.',
    disciplines: ['Sports aftermovies', 'Event coverage', 'Promotional videos', 'Branded content'],
  },
]

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<
  CategoryId,
  Category
>
