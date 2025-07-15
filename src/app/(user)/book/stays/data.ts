import { Stay } from './types';
export const stays: Stay[] = [
  {
    id: '1',
    name: 'Himalayan Lodge Everest',
    location: 'Namche Bazaar',
    description: 'Experience authentic Sherpa hospitality in this cozy lodge with stunning mountain views. Perfect for trekkers and adventure seekers.',
    price: 45,
    rating: 4.8,
    totalReviews: 124,
    amenities: ['Mountain View', 'WiFi', 'Breakfast', 'Heating', 'Hot Shower', 'Trekking Gear Storage'],
    images: [
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
      'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg'
    ],
    host: {
      name: 'Pemba Sherpa',
      avatar: 'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg',
      verified: true,
      yearsHosting: 8,
      totalStays: 3
    },
    availability: {
      checkIn: '2024-01-15',
      checkOut: '2024-12-31'
    },
    languages: ['English', 'Nepali', 'Sherpa'],
    completedBookings: 450,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    stayType: 'Lodge'
  },
  {
    id: '2',
    name: 'Lakeside Paradise Resort',
    location: 'Pokhara',
    description: 'Luxury resort overlooking Phewa Lake with modern amenities and traditional Nepali architecture. Perfect for relaxation and romance.',
    price: 85,
    rating: 4.9,
    totalReviews: 89,
    amenities: ['Lake View', 'Swimming Pool', 'Spa', 'Restaurant', 'WiFi', 'Room Service', 'Balcony'],
    images: [
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg'
    ],
    host: {
      name: 'Sita Gurung',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      verified: true,
      yearsHosting: 5,
      totalStays: 2
    },
    availability: {
      checkIn: '2024-01-01',
      checkOut: '2024-12-31'
    },
    languages: ['English', 'Nepali', 'Hindi'],
    completedBookings: 320,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    stayType: 'Resort'
  },
  {
    id: '3',
    name: 'Traditional Newari Homestay',
    location: 'Bhaktapur',
    description: 'Immerse yourself in authentic Newari culture in this 200-year-old traditional home with modern comforts and home-cooked meals.',
    price: 35,
    rating: 4.7,
    totalReviews: 156,
    amenities: ['Cultural Experience', 'Home Cooked Meals', 'WiFi', 'Traditional Architecture', 'City Tour', 'Cooking Classes'],
    images: [
      'https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
    ],
    host: {
      name: 'Ram Joshi',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
      verified: true,
      yearsHosting: 12,
      totalStays: 1
    },
    availability: {
      checkIn: '2024-01-01',
      checkOut: '2024-12-31'
    },
    languages: ['English', 'Nepali', 'Newari'],
    completedBookings: 680,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    stayType: 'Homestay'
  },
  {
    id: '4',
    name: 'Chitwan Jungle Lodge',
    location: 'Chitwan National Park',
    description: 'Wildlife adventure lodge in the heart of Chitwan National Park. Experience elephant safaris, bird watching, and jungle walks.',
    price: 65,
    rating: 4.6,
    totalReviews: 92,
    amenities: ['Safari Tours', 'Wildlife Viewing', 'Restaurant', 'WiFi', 'Air Conditioning', 'Nature Walks', 'Bird Watching'],
    images: [
      'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg',
      'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg'
    ],
    host: {
      name: 'Bikash Tharu',
      avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
      verified: true,
      yearsHosting: 6,
      totalStays: 2
    },
    availability: {
      checkIn: '2024-01-01',
      checkOut: '2024-12-31'
    },
    languages: ['English', 'Nepali', 'Tharu'],
    completedBookings: 280,
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    stayType: 'Lodge'
  },
  {
    id: '5',
    name: 'Kathmandu Heritage Hotel',
    location: 'Thamel',
    description: 'Boutique hotel in the heart of Kathmandu with easy access to temples, markets, and tourist attractions. Modern amenities meet traditional charm.',
    price: 55,
    rating: 4.5,
    totalReviews: 203,
    amenities: ['Central Location', 'Restaurant', 'WiFi', 'Airport Transfer', 'Rooftop Garden', 'Laundry Service', 'Tour Desk'],
    images: [
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg'
    ],
    host: {
      name: 'Maya Shrestha',
      avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg',
      verified: true,
      yearsHosting: 4,
      totalStays: 1
    },
    availability: {
      checkIn: '2024-01-01',
      checkOut: '2024-12-31'
    },
    languages: ['English', 'Nepali', 'Hindi', 'Tibetan'],
    completedBookings: 520,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    stayType: 'Hotel'
  },
  {
    id: '6',
    name: 'Annapurna Base Camp Lodge',
    location: 'Ghorepani',
    description: 'Mountain lodge on the famous Annapurna Circuit with panoramic views and authentic mountain hospitality. Perfect for trekkers.',
    price: 40,
    rating: 4.4,
    totalReviews: 87,
    amenities: ['Mountain View', 'Trekking Base', 'Hot Meals', 'WiFi', 'Heating', 'Gear Storage', 'Guide Services'],
    images: [
      'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg',
      'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg'
    ],
    host: {
      name: 'Dawa Gurung',
      avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
      verified: true,
      yearsHosting: 10,
      totalStays: 2
    },
    availability: {
      checkIn: '2024-03-01',
      checkOut: '2024-11-30'
    },
    languages: ['English', 'Nepali', 'Gurung'],
    completedBookings: 380,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    stayType: 'Lodge'
  }
];