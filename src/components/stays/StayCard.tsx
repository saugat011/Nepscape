'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Users, Bed, Bath, Shield, Heart, Eye } from 'lucide-react';
import { Stay } from '@/app/(user)/book/stays/types';

interface StayCardProps {
  stay: Stay;
  index: number;
  onBookNow: (stay: Stay) => void;
  onViewProfile: (stay: Stay) => void;
}

export default function StayCard({ stay, index, onBookNow, onViewProfile }: StayCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={Array.isArray(stay.images) && stay.images.length > 0 ? stay.images[0] : '/fallback-image.jpg'}
          alt={stay.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-[#3B82F6] text-white px-3 py-1 rounded-full text-sm font-medium">
            {stay.stayType}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <button className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors duration-200">
            <Heart className="w-5 h-5 text-[#6B7280] hover:text-red-500" />
          </button>
        </div>
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-[#F59E0B] fill-current" />
            <span className="font-semibold text-[#111827]">{stay.rating}</span>
            <span className="text-[#6B7280] text-sm">({stay.totalReviews})</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-[#111827] mb-2 group-hover:text-[#3B82F6] transition-colors duration-200">
            {stay.name}
          </h3>
          <div className="flex items-center gap-2 text-[#6B7280] mb-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{stay.location}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-[#6B7280]">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{stay.maxGuests} guests</span>
            </div>
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span>{stay.bedrooms} bed</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{stay.bathrooms} bath</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-[#6B7280] text-sm mb-4 line-clamp-2">
          {stay.description}
        </p>

        {/* Amenities */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {(Array.isArray(stay.amenities) ? stay.amenities.slice(0, 3) : []).map((amenity, idx) => (
              <span
                key={idx}
                className="bg-[#F9FAFB] text-[#111827] px-2 py-1 rounded-md text-xs"
              >
                {amenity}
              </span>
            ))}
            {Array.isArray(stay.amenities) && stay.amenities.length > 3 && (
              <span className="text-[#6B7280] text-xs px-2 py-1">
                +{stay.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Host Info */}
        <div className="flex items-center gap-3 mb-4 p-3 bg-[#F9FAFB] rounded-lg">
          <img
            src={stay.host?.avatar || '/fallback-avatar.jpg'}
            alt={stay.host?.name || 'Host'}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-[#111827]">{stay.host?.name || 'Host'}</span>
              {stay.host?.verified && (
                <Shield className="w-4 h-4 text-[#10B981]" />
              )}
            </div>
            <p className="text-sm text-[#6B7280]">
              {(stay.host?.yearsHosting ?? 'N/A')} years hosting • {stay.completedBookings ?? 0} bookings
            </p>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-[#111827]">${stay.price}</span>
            <span className="text-[#6B7280] ml-1">/ night</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onViewProfile(stay)}
              className="flex items-center gap-1 px-4 py-2 text-[#3B82F6] hover:text-[#2563EB] hover:bg-blue-50 rounded-lg transition-colors duration-200"
            >
              <Eye className="w-4 h-4" />
              <span className="text-sm font-medium">View</span>
            </button>
            <button
              onClick={() => onBookNow(stay)}
              className="px-6 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg font-medium transition-colors duration-200"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}