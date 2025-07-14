// components/booking/StayProfile.tsx
"use client"
import React from 'react';
import { Stay } from '@/app/(user)/book/stays/types'; // Adjust import path
import { Star, X } from 'lucide-react';

interface StayProfileProps {
  stay: Stay | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (stay: Stay) => void;
}

const StayProfile: React.FC<StayProfileProps> = ({ stay, isOpen, onClose, onBookNow }) => {
  if (!isOpen || !stay) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white max-w-3xl w-full rounded-lg shadow-lg overflow-auto max-h-[90vh] p-6 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <img src={stay.image} alt={stay.name} className="w-full h-64 object-cover rounded-md mb-6" />

        <h2 className="text-2xl font-bold mb-2">{stay.name}</h2>
        <p className="text-gray-600 mb-4">{stay.location}</p>

        <div className="flex items-center gap-3 mb-4">
          <span className="font-semibold">${stay.price} / night</span>
          <span className="flex items-center text-yellow-400">
            <Star className="w-5 h-5 mr-1" /> {stay.rating.toFixed(1)} ({stay.totalReviews} reviews)
          </span>
        </div>

        <p className="mb-4">{stay.description}</p>

        <h3 className="text-lg font-semibold mb-1">Amenities</h3>
        <ul className="list-disc list-inside mb-4">
          {stay.amenities.map((amenity, i) => (
            <li key={i}>{amenity}</li>
          ))}
        </ul>

        <h3 className="text-lg font-semibold mb-1">House Rules</h3>
        <ul className="list-disc list-inside mb-4">
          {stay.houseRules.map((rule, i) => (
            <li key={i}>{rule}</li>
          ))}
        </ul>

        <h3 className="text-lg font-semibold mb-1">About Host</h3>
        <p className="mb-6">{stay.aboutHost}</p>

        <button
          onClick={() => onBookNow(stay)}
          className="bg-amber-400 hover:bg-amber-500 text-black py-3 px-6 rounded-md font-semibold transition"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default StayProfile;
