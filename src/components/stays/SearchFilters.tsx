'use client';

import React from 'react';
import { Search, MapPin, Star, DollarSign, Globe } from 'lucide-react';
import { FilterState } from '@/app/(user)/book/stays/data';

interface SearchFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onSearch: (query: string) => void;
}

export default function SearchFilters({ filters, onFiltersChange, onSearch }: SearchFiltersProps) {
  const locations = ['All Locations', 'Kathmandu', 'Pokhara', 'Namche Bazaar', 'Bhaktapur', 'Chitwan National Park', 'Ghorepani'];
  const amenities = ['All Amenities', 'Mountain View', 'Lake View', 'WiFi', 'Restaurant', 'Swimming Pool', 'Spa', 'Trekking Base'];
  const languages = ['English', 'Nepali', 'Hindi', 'Sherpa', 'Newari', 'Tharu', 'Gurung', 'Tibetan'];

  const handleLanguageToggle = (language: string) => {
    const newLanguages = filters.languages.includes(language)
      ? filters.languages.filter(l => l !== language)
      : [...filters.languages, language];
    
    onFiltersChange({ ...filters, languages: newLanguages });
  };

  return (
    <div className="bg-white shadow-lg border-t-4 border-[#3B82F6]">
      <div className="max-w-7xl mx-auto p-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-4 h-5 w-5 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search stays, locations, or amenities..."
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-lg"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Location Filter */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Location
            </label>
            <select
              value={filters.location}
              onChange={(e) => onFiltersChange({ ...filters, location: e.target.value === 'All Locations' ? '' : e.target.value })}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
            >
              {locations.map(location => (
                <option key={location} value={location === 'All Locations' ? '' : location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Amenity Filter */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              <Star className="w-4 h-4 inline mr-1" />
              Amenities
            </label>
            <select
              value={filters.specialty}
              onChange={(e) => onFiltersChange({ ...filters, specialty: e.target.value === 'All Amenities' ? '' : e.target.value })}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
            >
              {amenities.map(amenity => (
                <option key={amenity} value={amenity === 'All Amenities' ? '' : amenity}>
                  {amenity}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              <DollarSign className="w-4 h-4 inline mr-1" />
              Price Range (per night)
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="200"
                value={filters.priceRange[1]}
                onChange={(e) => onFiltersChange({ 
                  ...filters, 
                  priceRange: [filters.priceRange[0], parseInt(e.target.value)] 
                })}
                className="w-full accent-[#3B82F6]"
              />
              <div className="text-sm text-[#6B7280]">
                $0 - ${filters.priceRange[1]}
              </div>
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              <Star className="w-4 h-4 inline mr-1" />
              Minimum Rating
            </label>
            <select
              value={filters.rating}
              onChange={(e) => onFiltersChange({ ...filters, rating: parseFloat(e.target.value) })}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
            >
              <option value={0}>Any Rating</option>
              <option value={4.5}>4.5+ Stars</option>
              <option value={4.0}>4.0+ Stars</option>
              <option value={3.5}>3.5+ Stars</option>
            </select>
          </div>
        </div>

        {/* Language Filter */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-[#111827] mb-3">
            <Globe className="w-4 h-4 inline mr-1" />
            Host Languages
          </label>
          <div className="flex flex-wrap gap-2">
            {languages.map(language => (
              <button
                key={language}
                onClick={() => handleLanguageToggle(language)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                  filters.languages.includes(language)
                    ? 'bg-[#3B82F6] text-white shadow-md'
                    : 'bg-[#F9FAFB] text-[#111827] hover:bg-gray-200'
                }`}
              >
                {language}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {(filters.location || filters.specialty || filters.rating > 0 || filters.languages.length > 0) && (
          <div className="mt-6 p-4 bg-[#F9FAFB] rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#111827]">Active Filters:</span>
              <button
                onClick={() => onFiltersChange({
                  location: '',
                  specialty: '',
                  priceRange: [0, 200],
                  rating: 0,
                  experience: '',
                  languages: []
                })}
                className="text-sm text-[#3B82F6] hover:text-[#2563EB] font-medium"
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {filters.location && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                  {filters.location}
                </span>
              )}
              {filters.specialty && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-emerald-100 text-emerald-800">
                  {filters.specialty}
                </span>
              )}
              {filters.rating > 0 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-amber-100 text-amber-800">
                  {filters.rating}+ Stars
                </span>
              )}
              {filters.languages.map(language => (
                <span key={language} className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                  {language}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}