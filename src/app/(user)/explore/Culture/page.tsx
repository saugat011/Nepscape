"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import { cultures } from "./data";

const filterOptions = [
  "all",
  "festival",
  "workshop",
  "traditional",
  "celebration",
  "heritage",
  "food",
  "dance",
  "ritual",
  "music",
  "craft",
  "homestay",
];

const CulturePage = () => {
  const [filter, setFilter] = useState("all");

  const filteredCultures =
    filter === "all"
      ? cultures
      : cultures.filter((item) => item.tags.includes(filter));

  return (
    <main className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-primary mb-10 text-center">
        Explore Nepal’s Rich Cultural Adventures
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
        {filteredCultures.map((item) => (
          <Card
            key={item.name}
            title={item.name}
            description={item.description}
            image={item.image}
          />
        ))}
      </div>
    </main>
  );
};

export default CulturePage;
