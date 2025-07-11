'use client';

import React from 'react';
import Head from 'next/head';
import CalendarView from '@/components/ui/CalendarView';
import { Cards } from '@/components/ui/Cards';
import FestivalCard from '@/components/ui/FestivalCard';
import StatsCards from '@/components/ui/StatsCards';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { nepaliEvents, getUpcomingEvents, getPastEvents, getEventsByMonth } from './data';

import { Calendar, Clock, History, List, Sparkles, MapPin } from 'lucide-react';

export default function HomePage() {
  const upcoming = getUpcomingEvents(nepaliEvents);
  const past = getPastEvents(nepaliEvents);
  const eventsByMonth = getEventsByMonth(nepaliEvents);

  return (
    <>
      <Head>
        <title>Nepali Festival Calendar 2025</title>
        <meta
          name="description"
          content="Explore Nepal's vibrant festivals and traditions in the Nepali Festival Calendar 2025."
        />
      </Head>

      <div className="min-h-screen bg-bg">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-primary via-hover to-secondary text-white py-20 px-6">
          <div className="absolute inset-0 bg-black opacity-10" />
          <div className="container mx-auto max-w-6xl text-center relative z-10">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                🇳🇵 Nepali Festival
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 animate-pulse">
                  Calendar 2025
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
                Discover the rich tapestry of Nepal's vibrant festivals, traditions, and celebrations.
                From ancient rituals to modern festivities, explore our cultural heritage.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" variant="secondary" className="transform hover:scale-105 transition-transform duration-300">
                  <Calendar className="w-5 h-5 mr-2" />
                  Explore Festivals
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:text-primary transform hover:scale-105 transition-all duration-300">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Learn Traditions
                </Button>
              </div>
            </div>
          </div>

          {/* Floating Emojis */}
          <div className="absolute top-10 left-10 text-6xl animate-bounce">🪔</div>
          <div className="absolute top-20 right-20 text-4xl animate-bounce" style={{ animationDelay: '2s' }}>🎭</div>
          <div className="absolute bottom-10 left-20 text-5xl animate-bounce" style={{ animationDelay: '4s' }}>🌸</div>
          <div className="absolute bottom-20 right-10 text-3xl animate-bounce" style={{ animationDelay: '6s' }}>🙏</div>
        </section>

        <div className="container mx-auto max-w-7xl px-6 py-12">
          {/* Stats */}
          <StatsCards events={nepaliEvents} />

          {/* Calendar and Upcoming Festivals */}
          <section className="mb-16">
            <div className="grid lg:grid-cols-2 gap-10">
              <CalendarView />
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-6 h-6 text-primary" />
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-hover bg-clip-text text-transparent">
                    Upcoming Festivals
                  </h2>
                </div>
                <div className="space-y-4">
                  {upcoming.map((event, index) => (
                    <div key={event.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                      <FestivalCard event={event} variant="upcoming" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Festivals by Month */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-hover bg-clip-text text-transparent">
                Festivals by Month
              </h2>
            </div>
            <div className="space-y-12">
              {Object.entries(eventsByMonth).map(([month, events]) => (
                <div key={month} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Badge className="bg-primary text-white px-4 py-2 text-lg font-semibold">{month}</Badge>
                    <div className="h-px bg-primary flex-1 opacity-30" />
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event, index) => (
                      <div key={event.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                        <FestivalCard event={event} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Past Festivals */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <History className="w-6 h-6 text-muted" />
              <h2 className="text-3xl font-bold text-muted">Past Festivals</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map((event, index) => (
                <div key={event.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <FestivalCard event={event} variant="past" />
                </div>
              ))}
            </div>
          </section>

          {/* Complete Directory */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <List className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-hover bg-clip-text text-transparent">
                Complete Festival Directory
              </h2>
            </div>
            <Cards className="overflow-hidden shadow-2xl">
              <div className="divide-y divide-gray-100">
                {nepaliEvents.map((event, index) => (
                  <div key={event.id} className="p-6 hover:bg-blue-50 transition-all duration-300 group">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
                        {event.category === 'religious'
                          ? '🙏'
                          : event.category === 'cultural'
                          ? '🎭'
                          : event.category === 'national'
                          ? '🇳🇵'
                          : '🌸'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-xl font-bold text-text group-hover:text-primary transition-colors duration-300">
                            {event.name}
                          </h4>
                          <Badge
                            variant={
                              event.importance === 'high'
                                ? 'primary'
                                : event.importance === 'medium'
                                ? 'secondary'
                                : 'success'
                            }
                          >
                            {event.importance.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-muted mb-3 leading-relaxed">{event.description}</p>
                        <div className="flex items-center gap-4 mb-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="font-medium">{event.englishDate}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-secondary" />
                            <span className="text-muted">{event.nepaliDate}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {event.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs hover:scale-105 transition-transform duration-200">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Cards>
          </section>

          {/* Footer */}
          <footer className="text-center py-12 border-t border-gray-200">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-hover bg-clip-text text-transparent">
                Celebrate Nepal's Rich Heritage
              </h3>
              <p className="text-muted max-w-2xl mx-auto">
                From the majestic mountains to the vibrant valleys, Nepal's festivals bring communities together
                in celebration of tradition, spirituality, and cultural unity.
              </p>
              <div className="flex justify-center gap-4 text-3xl">
                <span className="animate-bounce" style={{ animationDelay: '0s' }}>🏔️</span>
                <span className="animate-bounce" style={{ animationDelay: '0.5s' }}>🪔</span>
                <span className="animate-bounce" style={{ animationDelay: '1s' }}>🎭</span>
                <span className="animate-bounce" style={{ animationDelay: '1.5s' }}>🙏</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
