'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, Star, Award, TrendingUp, Shield, Search } from 'lucide-react';
import { FilterState, Stay, BookingFormData } from './types';
import { stays } from './data';
import SearchFilters from '@/components/stays/SearchFilters';
import StayCard from '@/components/stays/StayCard';
import BookingModal from '@/components/stays/BookingModal';
import StayProfile from '@/components/stays/StayProfile';

export default function StayBookingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    location: '',
    specialty: '',
    priceRange: [0, 200],
    rating: 0,
    experience: '',
    languages: []
  });
  const [selectedStay, setSelectedStay] = useState<Stay | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const filteredStays = useMemo(() => {
    return stays.filter(stay => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          stay.name.toLowerCase().includes(query) ||
          stay.location.toLowerCase().includes(query) ||
          stay.amenities.some(a => a.toLowerCase().includes(query)) ||
          stay.description.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      if (filters.location && stay.location !== filters.location) return false;
      if (filters.specialty && !stay.amenities.includes(filters.specialty)) return false;
      if (stay.price > filters.priceRange[1]) return false;
      if (filters.rating && stay.rating < filters.rating) return false;

      if (filters.languages.length > 0) {
        if (!filters.languages.every(lang => stay.languages?.includes(lang))) return false;
      }

      return true;
    });
  }, [searchQuery, filters]);

  const handleBookNow = (stay: Stay) => {
    setSelectedStay(stay);
    setShowBookingModal(true);
  };

  const handleViewProfile = (stay: Stay) => {
    setSelectedStay(stay);
    setShowProfileModal(true);
  };

  const handleBookingConfirm = (bookingData: BookingFormData) => {
    console.log('Booking confirmed:', bookingData, selectedStay);
    alert(`Stay confirmed at ${selectedStay?.name}! You'll receive a confirmation email shortly.`);
    setShowBookingModal(false);
  };

  const stats = {
    totalStays: stays.length,
    averageRating: (stays.reduce((sum, stay) => sum + stay.rating, 0) / stays.length).toFixed(1),
    totalReviews: stays.reduce((sum, stay) => sum + stay.totalReviews, 0),
    completedBookings: stays.reduce((sum, stay) => sum + (stay.completedBookings ?? 0), 0),
  };

  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#3B82F6] via-blue-700 to-blue-800 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Book Your Dream
            <span className="block text-[#F59E0B]">Stay in Nepal</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Discover cozy lodges, mountain resorts, and authentic homestays. Plan your perfect getaway with trusted hosts across Nepal.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 mr-2" />
                <span className="text-3xl font-bold">{stats.totalStays}+</span>
              </div>
              <p className="text-white/80">Available Stays</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-6 h-6 mr-2" />
                <span className="text-3xl font-bold">{stats.averageRating}</span>
              </div>
              <p className="text-white/80">Avg. Rating</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="w-6 h-6 mr-2" />
                <span className="text-3xl font-bold">{stats.totalReviews}+</span>
              </div>
              <p className="text-white/80">Guest Reviews</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 mr-2" />
                <span className="text-3xl font-bold">{stats.completedBookings}+</span>
              </div>
              <p className="text-white/80">Bookings Completed</p>
            </div>
          </motion.div>
        </div>
      </div>

      <SearchFilters
        filters={filters}
        onFiltersChange={setFilters}
        onSearch={setSearchQuery}
      />

      <div className="py-8 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#111827] mb-2">
                {filteredStays.length} Stay{filteredStays.length !== 1 ? 's' : ''} Available
              </h2>
              {searchQuery && (
                <p className="text-[#6B7280]">
                  Showing results for "<span className="font-semibold">{searchQuery}</span>"
                </p>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-[#6B7280]">
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-[#10B981]" />
                <span>Verified Hosts</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-[#F59E0B]" />
                <span>Top Rated</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredStays.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-[#6B7280] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#111827] mb-2">No stays found</h3>
              <p className="text-[#6B7280] mb-6">Try adjusting your search criteria or filters</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilters({
                    location: '',
                    specialty: '',
                    priceRange: [0, 200],
                    rating: 0,
                    experience: '',
                    languages: []
                  });
                }}
                className="text-[#3B82F6] hover:text-[#2563EB] font-semibold"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStays.map((stay, index) => (
                <StayCard
                  key={stay.id}
                  stay={stay}
                  index={index}
                  onBookNow={handleBookNow}
                  onViewProfile={handleViewProfile}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-[#F9FAFB] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-[#111827] mb-6"
          >
            Why Book With Us?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#10B981]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Hosts</h3>
              <p className="text-[#6B7280]">All stays are hosted by verified locals with trusted hospitality records.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-[#3B82F6]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Top Rated Comfort</h3>
              <p className="text-[#6B7280]">Handpicked listings with excellent amenities and real guest reviews.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#F59E0B]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-[#6B7280]">We're here to help anytime – before, during, or after your trip.</p>
            </motion.div>
          </div>
        </div>
      </div>

      <BookingModal
        guide={selectedStay}
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        onConfirm={handleBookingConfirm}
      />

      <StayProfile
        stay={selectedStay}
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onBookNow={handleBookNow}
      />
    </main>
  );
}