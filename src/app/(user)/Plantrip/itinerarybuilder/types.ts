export interface Activity {
  id: string;
  title: string;
  description: string;
  location: string;
  time: string;
  duration: number; // in minutes
  type: 'sightseeing' | 'food' | 'transport' | 'accommodation' | 'activity';
}

export interface ItineraryDay {
  id: string;
  date: string;
  title: string;
  activities: Activity[];
}

export interface Itinerary {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  days: ItineraryDay[];
}