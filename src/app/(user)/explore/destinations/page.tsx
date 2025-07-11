"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import { destinations } from './data';


// Complete categorized destinations


// Filters from all tag types
const filterOptions = [
  "all",
  "mountain",
  "lake",
  "heritage",
  "wildlife",
  "spiritual",
  "culture",
  "trek",
  "hill",
];

const DestinationsPage = () => {
  const [filter, setFilter] = useState("all");

  const filteredDestinations =
    filter === "all"
      ? destinations
      : destinations.filter((place) => place.tags.includes(filter));

  return (
    <main className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-primary mb-10 text-center">
        Top Destinations in Nepal
      </h1>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {filterOptions.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`px-4 py-2 rounded-full border capitalize ${
              filter === tag
                ? "bg-primary text-white"
                : "bg-white text-primary"
            } hover:bg-primary hover:text-white transition`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDestinations.map((place) => (
          <Card
            key={place.name}
            title={place.name}
            description={place.description}
            image={place.image}
          />
        ))}
      </div>
    </main>
  );
};

export default DestinationsPage;
