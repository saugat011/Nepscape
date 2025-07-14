// types.ts

export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface Stay {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  description: string;

  amenities: string[];
  hostLanguages: string[];
  availability: DayOfWeek[];
  totalReviews: number;
  verified: boolean;
  completedBookings: number;
  checkInTime: string;
  checkOutTime: string;
  houseRules: string[];
  aboutHost: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  specialRequests?: string;
  roomType: string;
}

export interface FilterState {
  location: string;
  specialty: string;
  priceRange: [number, number];
  rating: number;
  experience: string; // Added for compatibility with SearchFilters
  languages: string[];
}
