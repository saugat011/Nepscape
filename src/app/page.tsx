"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import './globals.css';

// Content Constants
const HERO = {
  title: "Discover Nepal with Nepscape",
  subtitle:
    "Explore hidden trails, book local homestays, and experience Nepal's vibrant culture with a smart digital guide.",
  ctaText: "Start Exploring",
  ctaLink: "/explore",
  image: "/nepscape.jpg",
};

const FEATURES = [
  {
    icon: "🧭",
    title: "Verified Local Guides",
    desc: "Find trusted and reviewed guides for every region.",
  },
  {
    icon: "📅",
    title: "Real-Time Bookings",
    desc: "Book treks, tours, and homestays with instant confirmation.",
  },
  {
    icon: "🗺️",
    title: "Offline Trekking Maps",
    desc: "Download GPS-enabled maps for signal-free adventures.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Search & Explore",
    description: "Browse destinations, trails, and cultural spots easily.",
  },
  {
    step: "2",
    title: "Plan Your Trip",
    description: "Use our AI-powered tools to build your perfect itinerary.",
  },
  {
    step: "3",
    title: "Book & Go",
    description: "Book guides, homestays, and activities instantly.",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    text: "Nepscape made my solo trek in Nepal safe and unforgettable!",
    image: "/avatar.png",
  },
  {
    name: "Daniel T.",
    text: "Loved the cultural experiences I could find and book so easily.",
    image: "/avatar.png",
  },
];

const CTA = {
  title: "Ready to explore the real Nepal?",
  subtitle:
    "Let Nepscape be your trusted companion to discover nature, people, and culture.",
  buttonText: "Plan My Trip",
  buttonLink: "/plan-trip",
};
// 🔝 Static Content Objects
const DESTINATIONS = [
  { name: "Pokhara", img: "/image.png" },
  { name: "Everest Base Camp", img: "/everest.png" },
  { name: "Lumbini", img: "/lumbini.png" },
];

const BLOG_POSTS = [
  {
    title: "Top 10 Treks in Nepal for Beginners",
    excerpt:
      "If you're new to trekking in Nepal, here are the perfect trails to start your adventure.",
    href: "/stories",
  },
  {
    title: "Cultural Etiquette You Must Know",
    excerpt:
      "Respect local customs and connect deeper with the people and places.",
    href: "/stories",
  },
];

const COMMUNITY = {
  title: "Join the Nepscape Community",
  subtitle:
    "Share stories, get tips from other travelers, and be part of Nepal’s passionate explorer network.",
  buttonText: "Join Now",
  buttonLink: "/forum",
};


const LandingPage = () => {
  return (
    <main className="min-h-screen bg-bg text-text">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-16 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-6 leading-tight">
            {HERO.title}
          </h1>
          <p className="text-lg text-muted mb-6">{HERO.subtitle}</p>
          <Link
            href={HERO.ctaLink}
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-hover transition"
          >
            {HERO.ctaText}
          </Link>
        </motion.div>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <Image
  src={HERO.image} // Make sure this is a .png with transparency
  alt="Nepal Travel"
  width={600}
  height={400}
  className="rounded-2xl shadow-xl object-contain bg-transparent"
/>

        </motion.div>
      </section>

      {/* Features */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Why Choose Nepscape?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.2 }}
                className="bg-bg rounded-xl p-6 shadow hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-primary">{item.title}</h3>
                <p className="text-muted mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gray-100 text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.2 }}
                className="bg-white p-6 rounded-xl shadow"
              >
                <div className="text-4xl font-bold text-accent mb-2">{step.step}</div>
                <h3 className="text-xl font-semibold text-primary">{step.title}</h3>
                <p className="text-muted mt-2">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What Travelers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.2 }}
                className="bg-bg p-6 rounded-xl shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={review.image}
                    alt={review.name}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                  <h4 className="text-lg font-semibold">{review.name}</h4>
                </div>
                <p className="text-muted">{review.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary to-hover text-white text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{CTA.title}</h2>
          <p className="text-lg mb-8">{CTA.subtitle}</p>
          <Link
            href={CTA.buttonLink}
            className="bg-white text-primary font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            {CTA.buttonText}
          </Link>
        </motion.div>
      </section>
      
      {/* Popular Destinations */}
<section className="py-20 px-6 bg-bg text-center">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold mb-12">Popular Destinations</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {DESTINATIONS.map((dest, i) => (
        <motion.div
          key={dest.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.2 }}
          className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden"
        >
          <Image
            src={dest.img}
            alt={dest.name}
            width={400}
            height={250}
            className="object-cover w-full h-56"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-primary">{dest.name}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* Travel Blog */}
<section className="py-20 px-6 bg-white text-center">
  <div className="max-w-5xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold mb-12">From Our Travel Blog</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {BLOG_POSTS.map((post, i) => (
        <motion.div
          key={post.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.2 }}
          className="text-left p-6 bg-bg rounded-xl shadow"
        >
          <h3 className="text-xl font-bold text-primary mb-2">{post.title}</h3>
          <p className="text-muted mb-4">{post.excerpt}</p>
          <Link
            href={post.href}
            className="text-indigo-600 hover:underline font-semibold"
          >
            Read more →
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* Join Community */}
<section className="py-20 px-6 bg-indigo-50 text-center">
  <div className="max-w-3xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-4">
        {COMMUNITY.title}
      </h2>
      <p className="text-muted mb-6">{COMMUNITY.subtitle}</p>
      <Link
        href={COMMUNITY.buttonLink}
        className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-hover transition"
      >
        {COMMUNITY.buttonText}
      </Link>
    </motion.div>
  </div>
</section>

    </main>
  );
};

export default LandingPage;
