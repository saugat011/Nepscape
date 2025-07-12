// app/guides/data.ts
import { Guide } from './types';

export const guidesData: Guide[] = [
  {
    id: '1',
    name: 'Sita Rana',
    location: 'Pokhara, Nepal',
    price: 50,
    rating: 4.9,
    image: 'https://source.unsplash.com/featured/?woman,guide,nepal',
    description: 'Certified trekking guide with 5+ years of experience in the Annapurna region.',
  },
  {
    id: '2',
    name: 'Kiran Thapa',
    location: 'Kathmandu, Nepal',
    price: 45,
    rating: 4.7,
    image: 'https://source.unsplash.com/featured/?man,guide,mountains',
    description: 'Expert cultural tour guide around the Kathmandu Valley.',
  },
  {
    id: '3',
    name: 'Laxmi Gurung',
    location: 'Chitwan, Nepal',
    price: 40,
    rating: 4.8,
    image: 'https://source.unsplash.com/featured/?jungle,nepal,woman',
    description: 'Wildlife safari guide in Chitwan National Park with deep local knowledge.',
  },
  {
    id: '4',
    name: 'Bikash Lama',
    location: 'Lukla, Nepal',
    price: 55,
    rating: 5.0,
    image: 'https://source.unsplash.com/featured/?everest,guide,man',
    description: 'Experienced mountain guide for Everest Base Camp and beyond.',
  },
];
