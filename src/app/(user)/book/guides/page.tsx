'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, Users, Search, Award, TrendingUp } from 'lucide-react';
import { guides } from './data';
import { Guide, FilterState, BookingFormData } from './types';
import SearchFilters from '@/components/booking/SearchFilters';
import GuideCard from '@/components/booking/GuideCard';
import BookingModal from '@/components/booking/BookingModal';
import GuideProfile from '@/components/booking/GuideProfile';

export default function GuideBookingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    location: '',
    specialty: '',
    priceRange: [0, 100],
    rating: 0,
    experience: '',
    languages: []
  });
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const filteredGuides = useMemo(() => {
    return guides.filter(guide => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          guide.name.toLowerCase().includes(query) ||
          guide.location.toLowerCase().includes(query) ||
          guide.specialties.some(s => s.toLowerCase().includes(query)) ||
          guide.description.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      if (filters.location && guide.location !== filters.location) return false;
      if (filters.specialty && !guide.specialties.includes(filters.specialty)) return false;
      if (guide.price > filters.priceRange[1]) return false;
      if (filters.rating && guide.rating < filters.rating) return false;

      if (filters.experience) {
        const experienceYears = parseInt(guide.experience);
        const filterYears = parseInt(filters.experience);
        if (experienceYears < filterYears) return false;
      }

      return true;
    });
  }, [searchQuery, filters]);

  const handleBookNow = (guide: Guide) => {
    setSelectedGuide(guide);
    setShowBookingModal(true);
  };

  const handleViewProfile = (guide: Guide) => {
    setSelectedGuide(guide);
    setShowProfileModal(true);
  };

  const handleBookingConfirm = (bookingData: BookingFormData) => {
    console.log('Booking confirmed:', bookingData, selectedGuide);
    alert(`Booking confirmed for ${selectedGuide?.name}! You will receive a confirmation email shortly.`);
    setShowBookingModal(false);
  };

  const stats = {
    totalGuides: guides.length,
    averageRating: (guides.reduce((sum, guide) => sum + guide.rating, 0) / guides.length).toFixed(1),
    totalReviews: guides.reduce((sum, guide) => sum + guide.totalReviews, 0),
    completedTours: guides.reduce((sum, guide) => sum + guide.completedTours, 0)
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Find Your Perfect
            <span className="block text-amber-400">Local Guide</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Discover Nepal's hidden gems with certified local experts. From mountain treks to cultural tours, find the perfect guide for your adventure.
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
                <span className="text-3xl font-bold">{stats.totalGuides}+</span>
              </div>
              <p className="text-white/80">Expert Guides</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-6 h-6 mr-2" />
                <span className="text-3xl font-bold">{stats.averageRating}</span>
              </div>
              <p className="text-white/80">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="w-6 h-6 mr-2" />
                <span className="text-3xl font-bold">{stats.totalReviews}+</span>
              </div>
              <p className="text-white/80">Happy Reviews</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 mr-2" />
                <span className="text-3xl font-bold">{stats.completedTours}+</span>
              </div>
              <p className="text-white/80">Tours Completed</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {filteredGuides.length} Guide{filteredGuides.length !== 1 ? 's' : ''} Available
              </h2>
              {searchQuery && (
                <p className="text-gray-600">
                  Showing results for "<span className="font-semibold">{searchQuery}</span>"
                </p>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>All guides verified</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500" />
                <span>Top rated</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredGuides.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No guides found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilters({
                    location: '',
                    specialty: '',
                    priceRange: [0, 100],
                    rating: 0,
                    experience: '',
                    languages: []
                  });
                }}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGuides.map((guide, index) => (
                <GuideCard
                  key={guide.id}
                  guide={guide}
                  index={index}
                  onBookNow={handleBookNow}
                  onViewProfile={handleViewProfile}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            Why Choose Our Platform?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Guides</h3>
              <p className="text-gray-600">All our guides are thoroughly vetted, licensed, and background-checked for your safety.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Top Rated</h3>
              <p className="text-gray-600">Choose from highly-rated guides with proven track records and excellent customer reviews.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Get round-the-clock assistance before, during, and after your adventure.</p>
            </motion.div>
          </div>
        </div>
      </div>

      <BookingModal
        guide={selectedGuide}
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        onConfirm={handleBookingConfirm}
      />

      <GuideProfile
        guide={selectedGuide}
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onBookNow={handleBookNow}
      />
    </main>
  );
}
