"use client"
import { useState } from 'react';
import {treks} from './data';
import Card from "@/components/ui/Card";


const filterOptions=[
    "all",
    "Classic Trek",
    "Luxury Trek",
    "Heli Trek",
    "Short Trek",
    "Long Trek",
    "Adventure Trek",
    "Easy Trek",
    "Remote Trek",
    "Cultural Trek",
    "Restricted Trek",
    "Expedition Trek",



];
const TrekPage=()=>{
    const [filter, setFilter]=useState("all");

    const filterTrek=
    filter==="all"? treks: treks.filter((place)=>place.type.includes(filter))


  return (
    <main className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-primary mb-10 text-center">
        Top Treks in Nepal
      </h1>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {filterOptions.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full border capitalize ${
              filter === type
                ? "bg-primary text-white"
                : "bg-white text-primary"
            } hover:bg-primary hover:text-white transition`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filterTrek.map((place) => (
          <Card
            key={place.name}
            title={place.region}
            description={place.description}
            image={place.image}
          />
        ))}
      </div>
    </main>
  );
};


export default TrekPage;