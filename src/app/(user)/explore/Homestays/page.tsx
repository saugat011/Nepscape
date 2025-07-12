// app/homestay/page.tsx
"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import { homestays } from "./data";

const regionFilters = ["all", "Bagmati", "Gandaki", "Lumbini"];

const HomestayPage = () => {
  const [regionFilter, setRegionFilter] = useState("all");

  const filteredHomestays =
    regionFilter === "all"
      ? homestays
      : homestays.filter((place) => place.region === regionFilter);

  return (
    <main className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-primary mb-10 text-center">
        Explore Homestays in Nepal
      </h1>

      {/* Region Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {regionFilters.map((region) => (
          <button
            key={region}
            type="button"
            onClick={() => setRegionFilter(region)}
            className={`px-4 py-2 rounded-full border capitalize ${
              regionFilter === region
                ? "bg-primary text-white"
                : "bg-white text-primary"
            } hover:bg-primary hover:text-white transition`}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Homestay Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredHomestays.map((place) => (
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

export default HomestayPage;
