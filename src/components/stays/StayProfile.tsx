'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, MapPin, Users, Bed, Bath, Wifi, Car, Coffee, Shield, Award, Languages, Calendar } from 'lucide-react';
import { Stay } from '@/app/(user)/book/stays/types';

interface StayProfileProps {
  stay: Stay | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (stay: Stay) => void;
}

export default function StayProfile({ stay, isOpen, onClose, onBookNow }: StayProfileProps) {
  if (!stay) return null;

  const amenityIcons: Record<string, React.ReactNode> = {
    'WiFi': <Wifi className="w-5 h-5" />,
    'Parking': <Car className="w-5 h-5" />,
    'Breakfast': <Coffee className="w-5 h-5" />,
    'Mountain View': <Calendar className="w-5 h-5" />,
    'Lake View': <Calendar className="w-5 h-5" />,
    'Swimming Pool': <Calendar className="w-5 h-5" />,
    'Spa': <Calendar className="w-5 h-5" />,
    'Restaurant': <Coffee className="w-5 h-5" />,
    'Room Service': <Coffee className="w-5 h-5" />,
    'Hot Shower': <Coffee className="w-5 h-5" />,
    'Heating': <Coffee className="w-5 h-5" />,
    'Air Conditioning': <Coffee className="w-5 h-5" />
  };

  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Absolutely amazing stay! The host was incredibly welcoming and the location was perfect for our Nepal adventure.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
      rating: 5,
      date: '1 month ago',
      comment: 'Beautiful property with stunning views. Everything was clean and well-maintained. Highly recommend!'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg',
      rating: 4,
      date: '2 months ago',
      comment: 'Great value for money. The host provided excellent local recommendations and made our stay memorable.'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="relative min-h-screen flex items-start justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl my-8"
            >
              {/* Header */}
              <div className="relative">
                <div className="h-80 overflow-hidden rounded-t-2xl">
                  <img
                    src={stay.images[0]}
                    alt={stay.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-3 bg-white/90 hover:bg-white rounded-full transition-colors shadow-lg"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-[#F59E0B] fill-current" />
                    <span className="font-bold text-[#111827] text-lg">{stay.rating}</span>
                    <span className="text-[#6B7280]">({stay.totalReviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                {/* Title and Location */}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-[#111827] mb-2">{stay.name}</h1>
                      <div className="flex items-center gap-2 text-[#6B7280] mb-2">
                        <MapPin className="w-5 h-5" />
                        <span className="text-lg">{stay.location}</span>
                      </div>
                      <div className="flex items-center gap-6 text-[#6B7280]">
                        <div className="flex items-center gap-1">
                          <Users className="w-5 h-5" />
                          <span>{stay.maxGuests} guests</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bed className="w-5 h-5" />
                          <span>{stay.bedrooms} bedrooms</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="w-5 h-5" />
                          <span>{stay.bathrooms} bathrooms</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-[#111827]">${stay.price}</div>
                      <div className="text-[#6B7280]">per night</div>
                    </div>
                  </div>
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {stay.stayType}
                  </span>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-[#111827] mb-3">About this stay</h2>
                  <p className="text-[#6B7280] leading-relaxed">{stay.description}</p>
                </div>

                {/* Host Information */}
                <div className="mb-8 p-6 bg-[#F9FAFB] rounded-xl">
                  <h2 className="text-xl font-bold text-[#111827] mb-4">Meet your host</h2>
                  <div className="flex items-start gap-4">
                    <img
                      src={stay.host.avatar}
                      alt={stay.host.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-[#111827]">{stay.host.name}</h3>
                        {stay.host.verified && (
                          <div className="flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-sm">
                            <Shield className="w-4 h-4" />
                            <span>Verified</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-6 text-[#6B7280] mb-3">
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          <span>{stay.host.yearsHosting} years hosting</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          <span>{stay.completedBookings} successful bookings</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Languages className="w-4 h-4 text-[#6B7280]" />
                        <span className="text-[#6B7280]">Speaks: {stay.languages?.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-[#111827] mb-4">What this place offers</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {stay.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-lg">
                        {amenityIcons[amenity] || <Calendar className="w-5 h-5" />}
                        <span className="text-[#111827]">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-[#111827]">Guest Reviews</h2>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-[#F59E0B] fill-current" />
                      <span className="font-semibold">{stay.rating} • {stay.totalReviews} reviews</span>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="flex gap-4">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-semibold text-[#111827]">{review.name}</span>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: review.rating }).map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-[#F59E0B] fill-current" />
                              ))}
                            </div>
                            <span className="text-[#6B7280] text-sm">{review.date}</span>
                          </div>
                          <p className="text-[#6B7280]">{review.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Booking Section */}
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-[#111827] mb-1">
                        ${stay.price} <span className="text-lg font-normal text-[#6B7280]">per night</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#10B981]">
                        <Shield className="w-4 h-4" />
                        <span className="text-sm">Verified host • Instant booking</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onBookNow(stay)}
                      className="px-8 py-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl font-semibold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}