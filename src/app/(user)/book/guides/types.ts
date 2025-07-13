export interface Guide {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  description: string;

  languages: string[];
  experience: string;
  specialties: string[];
  totalReviews: number;
  verified: boolean;
  availability: string[];
  responseTime: string;
  completedTours: number;
  certifications: string[];
  aboutMe: string;
  services: string[];
}
export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  duration: number;
  groupSize: number;
  specialRequests?: string;
  serviceType: string;
}


export interface FilterState {
  location: string;
  specialty: string;
  priceRange: [number, number]; // Tuple of two numbers
  rating: number;
  experience: string;
  languages: string[];
}

