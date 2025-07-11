import React from 'react';
import { Calendar, Star, Globe, Clock } from 'lucide-react';
import { Cards } from './Cards';
import { Festival } from '@/app/types/festival';

interface StatsCardsProps {
  events: Festival[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ events }) => {
  const totalEvents = events.length;
  const highImportance = events.filter(e => e.importance === 'high').length;
  const religiousEvents = events.filter(e => e.category === 'religious').length;
  const culturalEvents = events.filter(e => e.category === 'cultural').length;
  
  const stats = [
    {
      title: 'Total Festivals',
      value: totalEvents,
      icon: Calendar,
      gradient: 'from-primary to-hover',
      description: 'Celebrating throughout the year'
    },
    {
      title: 'Major Festivals',
      value: highImportance,
      icon: Star,
      gradient: 'from-accent to-yellow-600',
      description: 'High importance celebrations'
    },
    {
      title: 'Religious Events',
      value: religiousEvents,
      icon: Globe,
      gradient: 'from-secondary to-emerald-600',
      description: 'Spiritual celebrations'
    },
    {
      title: 'Cultural Events',
      value: culturalEvents,
      icon: Clock,
      gradient: 'from-secondary to-teal-600',
      description: 'Traditional celebrations'
    }
  ];
  
  return (
    <section className="mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Cards key={stat.title} hover className="p-6 group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.gradient} text-white transform group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-right">
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{stat.title}</h3>
            <p className="text-sm text-gray-600">{stat.description}</p>
          </Cards>
        ))}
      </div>
    </section>
  );
};

export default StatsCards;