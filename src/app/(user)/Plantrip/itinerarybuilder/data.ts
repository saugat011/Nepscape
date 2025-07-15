import { Itinerary } from './types';

export const sampleItinerary: Itinerary = {
  id: 'sample-1',
  title: 'Amazing Nepal Adventure',
  destination: 'Nepal',
  startDate: '2025-07-15',
  endDate: '2025-03-20',
  days: [
    {
      id: 'day-1',
      date: '2025-07-15',
      title: 'Arrival in Kathmandu',
      activities: [
        {
          id: 'activity-1',
          title: 'Airport Pickup',
          description: 'Arrival at Tribhuvan International Airport',
          location: 'Tribhuvan International Airport, Kathmandu',
          time: '14:00',
          duration: 60,
          type: 'transport'
        },
        {
          id: 'activity-2',
          title: 'Hotel Check-in',
          description: 'Check into hotel and freshen up',
          location: 'Hotel Yak & Yeti, Kathmandu',
          time: '16:00',
          duration: 120,
          type: 'accommodation'
        },
        {
          id: 'activity-3',
          title: 'Thamel Street Walk',
          description: 'Explore the vibrant Thamel district',
          location: 'Thamel, Kathmandu',
          time: '19:00',
          duration: 180,
          type: 'sightseeing'
        }
      ]
    },
    {
      id: 'day-2',
      date: '2025-07-16',
      title: 'Kathmandu Sightseeing',
      activities: [
        {
          id: 'activity-4',
          title: 'Pashupatinath Temple',
          description: 'Visit the sacred Hindu temple',
          location: 'Pashupatinath Temple, Kathmandu',
          time: '09:00',
          duration: 180,
          type: 'sightseeing'
        },
        {
          id: 'activity-5',
          title: 'Boudhanath Stupa',
          description: 'Explore the largest stupa in Nepal',
          location: 'Boudhanath Stupa, Kathmandu',
          time: '13:00',
          duration: 120,
          type: 'sightseeing'
        },
        {
          id: 'activity-6',
          title: 'Local Dal Bhat',
          description: 'Traditional Nepali meal experience',
          location: 'Krishna Galli, Kathmandu',
          time: '18:00',
          duration: 90,
          type: 'food'
        }
      ]
    }
  ]
};

export const activityTypes = [
  { value: 'sightseeing', label: 'Sightseeing', color: '#3B82F6' },
  { value: 'food', label: 'Food & Dining', color: '#10B981' },
  { value: 'transport', label: 'Transport', color: '#F59E0B' },
  { value: 'accommodation', label: 'Accommodation', color: '#8B5CF6' },
  { value: 'activity', label: 'Activity', color: '#EF4444' },
  { value: 'trek', label: 'Treking', color: '#EF4444' }
];