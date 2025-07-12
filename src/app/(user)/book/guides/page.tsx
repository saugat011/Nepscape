// app/guides/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { guidesData } from './data';
import { Guide } from './types';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/booking/card'
import { Input } from '@/components/booking/input';

export default function GuidesPage() {
  const [search, setSearch] = useState('');
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  const filteredGuides = useMemo(() => {
    return guidesData.filter((guide) =>
      guide.name.toLowerCase().includes(search.toLowerCase()) ||
      guide.location.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Book a Guide</h1>

      <div className="mb-6 flex justify-center">
        <Input
          placeholder="Search by name or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.map((guide) => (
          <Card key={guide.id} className="group hover:shadow-lg transition">
            <div className="h-48 overflow-hidden rounded-t">
              <img
                src={guide.image}
                alt={guide.name}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{guide.name}</h3>
                <span className="text-sm font-medium text-blue-600">${guide.price}/day</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{guide.description}</p>
              <div className="text-sm text-muted">{guide.location}</div>
              <Button
                className="w-full mt-2"
                onClick={() => setSelectedGuide(guide)}
              >
                Book Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedGuide && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-2">Book {selectedGuide.name}</h2>
            <p className="text-sm text-muted mb-4">
              Location: {selectedGuide.location}<br />
              Price: ${selectedGuide.price}/day
            </p>
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={() => {
                alert(`Guide "${selectedGuide.name}" booked successfully!`);
                setSelectedGuide(null);
              }}
            >
              Confirm Booking
            </Button>
            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={() => setSelectedGuide(null)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
