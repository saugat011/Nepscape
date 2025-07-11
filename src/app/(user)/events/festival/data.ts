// src/app/(user)/events/festival/data.ts
import { parseISO, isAfter, isBefore } from 'date-fns';

export type Festival = {
  id: string;
  name: string;
  description: string;
  englishDate: string; // format: "YYYY-MM-DD"
  nepaliDate: string;
  importance: 'high' | 'medium' | 'low';
  category: 'religious' | 'cultural' | 'national' | string;
  tags: string[];
};

export const nepaliEvents: Festival[] = [
  {
    id: '1',
    name: 'Tihar',
    description: 'Festival of lights celebrated for five days.',
    englishDate: '2025-10-20',
    nepaliDate: '2082-07-03',
    importance: 'high',
    category: 'religious',
    tags: ['lights', 'laxmi', 'brothers', 'diwali'],
  },
  {
    id: '2',
    name: 'Holi',
    description: 'Festival of colors celebrated across Nepal with joy and water fights.',
    englishDate: '2025-03-17',
    nepaliDate: '2081-12-04',
    importance: 'high',
    category: 'cultural',
    tags: ['colors', 'fun', 'spring', 'celebration'],
  },
  {
    id: '3',
    name: 'Dashain',
    description: 'Nepal’s biggest Hindu festival honoring Goddess Durga.',
    englishDate: '2025-10-01',
    nepaliDate: '2082-06-14',
    importance: 'high',
    category: 'religious',
    tags: ['family', 'durga', 'tika', 'goat'],
  },
  {
    id: '4',
    name: 'Buddha Jayanti',
    description: 'Celebration of the birth, enlightenment, and death of Gautam Buddha.',
    englishDate: '2025-05-12',
    nepaliDate: '2082-01-29',
    importance: 'high',
    category: 'religious',
    tags: ['buddha', 'peace', 'lumbini'],
  },
  {
    id: '5',
    name: 'Maghe Sankranti',
    description: 'Marks the end of winter solstice; people eat ghee, chaku, and yam.',
    englishDate: '2025-01-14',
    nepaliDate: '2081-09-01',
    importance: 'medium',
    category: 'cultural',
    tags: ['winter', 'traditional', 'food'],
  },
  {
    id: '6',
    name: 'Ghode Jatra',
    description: 'Horse parade held in Kathmandu to ward off evil spirits.',
    englishDate: '2025-03-24',
    nepaliDate: '2081-12-11',
    importance: 'medium',
    category: 'cultural',
    tags: ['horses', 'parade', 'kathmandu'],
  },
  {
    id: '7',
    name: 'Indra Jatra',
    description: 'Festival of rain god Indra, featuring mask dances and chariot processions.',
    englishDate: '2025-09-10',
    nepaliDate: '2082-05-24',
    importance: 'high',
    category: 'religious',
    tags: ['indra', 'kathmandu', 'chariot', 'kumari'],
  },
  {
    id: '8',
    name: 'Teej',
    description: 'Festival for women’s health, well-being, and prayers for a good husband.',
    englishDate: '2025-08-23',
    nepaliDate: '2082-05-06',
    importance: 'high',
    category: 'religious',
    tags: ['women', 'fasting', 'dance', 'shiva'],
  },
  {
    id: '9',
    name: 'Chhath',
    description: 'Sun worship festival mainly celebrated by Madhesi communities.',
    englishDate: '2025-11-07',
    nepaliDate: '2082-07-21',
    importance: 'medium',
    category: 'religious',
    tags: ['sun', 'madhesh', 'prayers'],
  },
  {
    id: '10',
    name: 'Janai Purnima',
    description: 'Sacred thread-changing ceremony for Hindus and Raksha Bandhan celebration.',
    englishDate: '2025-08-10',
    nepaliDate: '2082-04-25',
    importance: 'medium',
    category: 'religious',
    tags: ['thread', 'rakhi', 'shravan'],
  },
  {
    id: '11',
    name: 'Gai Jatra',
    description: 'Festival to commemorate the dead with satire, humor, and cow processions.',
    englishDate: '2025-08-18',
    nepaliDate: '2082-05-02',
    importance: 'medium',
    category: 'cultural',
    tags: ['cow', 'funny', 'mourning', 'bhakta'],
  },
  {
    id: '12',
    name: 'Maha Shivaratri',
    description: 'Night of Shiva celebrated with devotion and bonfires.',
    englishDate: '2025-02-26',
    nepaliDate: '2081-11-14',
    importance: 'high',
    category: 'religious',
    tags: ['shiva', 'bonfire', 'temple'],
  },
  {
    id: '13',
    name: 'Nepali New Year',
    description: 'Marks the start of Bikram Sambat calendar year.',
    englishDate: '2025-04-14',
    nepaliDate: '2082-01-01',
    importance: 'medium',
    category: 'national',
    tags: ['newyear', 'calendar', 'celebration'],
  },
  {
    id: '14',
    name: 'Constitution Day',
    description: 'Commemorates the promulgation of Nepal’s constitution in 2015.',
    englishDate: '2025-09-20',
    nepaliDate: '2082-06-04',
    importance: 'medium',
    category: 'national',
    tags: ['nepal', 'constitution', 'rights'],
  },
  {
    id: '15',
    name: 'Losar',
    description: 'Tibetan New Year celebrated by Sherpa, Tamang, and Gurung communities.',
    englishDate: '2025-02-01',
    nepaliDate: '2081-10-18',
    importance: 'medium',
    category: 'cultural',
    tags: ['newyear', 'tamang', 'buddhist'],
  },
  {
    id: '16',
    name: 'Fagu Purnima (Terai)',
    description: 'Terai region’s Holi, celebrated a day after the Hilly region.',
    englishDate: '2025-03-18',
    nepaliDate: '2081-12-05',
    importance: 'medium',
    category: 'cultural',
    tags: ['terai', 'holi', 'colors'],
  },
  {
    id: '17',
    name: 'Makar Sankranti',
    description: 'Transition of the Sun into Capricorn; celebrates harvest season.',
    englishDate: '2025-01-15',
    nepaliDate: '2081-09-02',
    importance: 'medium',
    category: 'religious',
    tags: ['sun', 'harvest', 'festival'],
  },
  {
    id: '18',
    name: 'Mother’s Day (Mata Tirtha Aunsi)',
    description: 'Day to honor mothers and maternal bonds.',
    englishDate: '2025-04-27',
    nepaliDate: '2082-01-14',
    importance: 'low',
    category: 'cultural',
    tags: ['mother', 'gifts', 'love'],
  },
  {
    id: '19',
    name: 'Father’s Day (Kushe Aunsi)',
    description: 'Nepali day to show respect and love to fathers.',
    englishDate: '2025-08-24',
    nepaliDate: '2082-05-07',
    importance: 'low',
    category: 'cultural',
    tags: ['father', 'tradition', 'gifts'],
  },
  {
    id: '20',
    name: 'Rishi Panchami',
    description: 'Observed by Hindu women to purify past sins.',
    englishDate: '2025-08-29',
    nepaliDate: '2082-05-12',
    importance: 'medium',
    category: 'religious',
    tags: ['fasting', 'women', 'rishi'],
  },
];


// Helper to sort by date
const sortByDate = (events: Festival[]) =>
  events.slice().sort((a, b) => parseISO(a.englishDate).getTime() - parseISO(b.englishDate).getTime());

export function getUpcomingEvents(events: Festival[]): Festival[] {
  const today = new Date();
  return sortByDate(events).filter((event) => isAfter(parseISO(event.englishDate), today));
}

export function getPastEvents(events: Festival[]): Festival[] {
  const today = new Date();
  return sortByDate(events).filter((event) => isBefore(parseISO(event.englishDate), today));
}

export function getEventsByMonth(events: Festival[]): Record<string, Festival[]> {
  return events.reduce((acc, event) => {
    const month = parseISO(event.englishDate).toLocaleString('default', { month: 'long' });
    if (!acc[month]) acc[month] = [];
    acc[month].push(event);
    return acc;
  }, {} as Record<string, Festival[]>);
}
