export interface Stay {
  id: string;
  name: string;
  location: string;
  description: string;
  price: number;
  rating: number;
  totalReviews: number;
  amenities: string[];
  images: string[];
  host: {
    name: string;
    avatar: string;
    verified: boolean;
    yearsHosting: number;
    totalStays: number;
  };
  availability: {
    checkIn: string;
    checkOut: string;
  };
  languages?: string[];
  completedBookings?: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  stayType: 'Lodge' | 'Homestay' | 'Resort' | 'Guesthouse' | 'Hotel';
}

export interface FilterState {
  location: string;
  specialty: string;
  priceRange: [number, number];
  rating: number;
  experience: string;
  languages: string[];
}

export interface BookingFormData {
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequests: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
}