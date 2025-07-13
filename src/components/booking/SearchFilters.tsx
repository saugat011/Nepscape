'use client';

import { useState } from 'react';
import { Search, Filter, MapPin, Star, DollarSign, Clock } from 'lucide-react';
import { Input } from '@/components/booking/input';
import { Button } from '@/components/booking/button';
import { Card } from '@/components/booking/card';
import { locations, specialties, experienceLevels } from '@/app/(user)/book/guides/data';
import { FilterState } from '@/app/(user)/book/guides/types';

interface SearchFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onSearch: (query: string) => void;
}

export default function SearchFilters({ filters, onFiltersChange, onSearch }: SearchFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const clearFilters = () => {
    onFiltersChange({
      location: '',
      specialty: '',
      priceRange: [0, 100],
      rating: 0,
      experience: '',
      languages: []
    });
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-5 h-5" />
            <Input
              type="text"
              placeholder="Search guides by name, location, or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
          <Button type="submit" size="lg" className="px-8">
            Search
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </form>

        {/* Filters */}
        {showFilters && (
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Location Filter */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-text mb-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {locations.map((location) => (
                    <option key={location} value={location === 'All Locations' ? '' : location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Specialty Filter */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-text mb-2">
                  <Star className="w-4 h-4" />
                  Specialty
                </label>
                <select
                  value={filters.specialty}
                  onChange={(e) => handleFilterChange('specialty', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty === 'All Specialties' ? '' : specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-text mb-2">
                  <DollarSign className="w-4 h-4" />
                  Max Price per Day
                </label>
                <select
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value={100}>Any Price</option>
                  <option value={40}>Under $40</option>
                  <option value={50}>Under $50</option>
                  <option value={60}>Under $60</option>
                  <option value={70}>Under $70</option>
                </select>
              </div>

              {/* Experience Filter */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-text mb-2">
                  <Clock className="w-4 h-4" />
                  Experience
                </label>
                <select
                  value={filters.experience}
                  onChange={(e) => handleFilterChange('experience', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {experienceLevels.map((level) => (
                    <option key={level} value={level === 'All Experience' ? '' : level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <Button variant="outline" onClick={clearFilters}>
                Clear All Filters
              </Button>
              <Button onClick={() => setShowFilters(false)}>
                Apply Filters
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}