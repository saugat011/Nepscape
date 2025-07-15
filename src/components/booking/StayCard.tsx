// components/booking/StayCard.tsx
"use client"
import React from 'react';
import { Star } from 'lucide-react';
import { Stay } from '@/app/(user)/book/stays/types'; 

interface StayCardProps {
  stay: Stay;
  onViewProfile: (stay: Stay) => void;
  onBookNow: (stay: Stay) => void;
}

const StayCard: React.FC<StayCardProps> = ({ stay, onViewProfile, onBookNow }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <img src={stay.image} alt={stay.name} className="h-48 w-full object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-1">{stay.name}</h3>
        <p className="text-gray-600 mb-2">{stay.location}</p>
        <div className="flex items-center mb-3">
          <Star className="w-5 h-5 text-yellow-400 mr-1" />
          <span className="font-medium">{stay.rating.toFixed(1)}</span>
          <span className="text-gray-500 ml-2">({stay.totalReviews} reviews)</span>
        </div>
        <p className="text-gray-800 font-semibold mb-4">${stay.price} / night</p>
        <div className="mt-auto flex gap-3">
          <button
            onClick={() => onViewProfile(stay)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
          >
            View Details
          </button>
          <button
            onClick={() => onBookNow(stay)}
            className="flex-1 bg-amber-400 hover:bg-amber-500 text-black py-2 rounded-md transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default StayCard;
