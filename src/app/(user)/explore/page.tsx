"use client";

import Link from "next/link";

const exploreSections = [
  {
    title: "Destinations",
    description:
      "Discover top places across Nepal, from Pokhara’s lakes to Everest’s peaks.",
    href: "/explore/destinations",
    image: "/images/destination.jpg",
  },
  {
    title: "Treks",
    description:
      "Explore famous trails like Annapurna Circuit and Everest Base Camp.",
    href: "/explore/treks",
    image: "/images/treks.jpg",
  },
  {
    title: "Homestays",
    description:
      "Stay with locals and experience authentic Nepali hospitality.",
    href: "/explore/homestays",
    image: "/images/homestay.jpg",
  },
  {
    title: "Culture",
    description:
      "Dive into Nepal’s festivals, rituals, temples, and local traditions.",
    href: "/explore/culture",
    image: "/images/culture.jpg",
  },
  {
    title: "Adventure",
    description:
      "Book thrilling activities like rafting, paragliding, and jungle safaris.",
    href: "/explore/adventure",
    image: "/images/adventure.jpg",
  },
];

const ExplorePage = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-primary mb-10 text-center">
        Explore Nepal
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {exploreSections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className="group rounded-xl overflow-hidden shadow-md bg-white hover:shadow-xl transition"
          >
            <div className="h-48 w-full overflow-hidden">
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="p-5">
              <h2 className="text-xl font-semibold text-primary mb-2">
                {section.title}
              </h2>
              <p className="text-muted">{section.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default ExplorePage;
