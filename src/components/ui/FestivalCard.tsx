import React from 'react';
import { Calendar, MapPin, Clock, Star } from 'lucide-react';
import { Cards } from './Cards';
import { Badge } from './Badge';
import { Festival } from '@/app/types/festival';

interface FestivalCardProps {
  event: Festival;
  variant?: 'default' | 'upcoming' | 'past';
}

const FestivalCard: React.FC<FestivalCardProps> = ({ event, variant = 'default' }) => {
  const getIcon = (category: string) => {
    const icons = {
      religious: '🙏',
      cultural: '🎭',
      national: '🇳🇵',
      seasonal: '🌸'
    };
    return icons[category as keyof typeof icons] || '🎉';
  };
  
  const getGradient = (importance: string) => {
    const gradients = {
      high: 'from-primary to-hover',
      medium: 'from-secondary to-emerald-600',
      low: 'from-gray-400 to-gray-500'
    };
    return gradients[importance as keyof typeof gradients] || gradients.medium;
  };
  
  const isUpcoming = variant === 'upcoming';
  const isPast = variant === 'past';
  
  return (
    <Cards hover className={`${isPast ? 'opacity-75' : ''} ${isUpcoming ? 'ring-2 ring-blue-200' : ''}`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{getIcon(event.category)}</div>
            <div>
              <h3 className={`text-xl font-bold ${isPast ? 'text-gray-600' : 'text-gray-800'}`}>
                {event.name}
              </h3>
              <Badge variant={event.importance === 'high' ? 'primary' : event.importance === 'medium' ? 'secondary' : 'success'}>
                {event.importance.toUpperCase()}
              </Badge>
            </div>
          </div>
          {isUpcoming && (
            <div className="flex items-center gap-1 text-primary">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Upcoming</span>
            </div>
          )}
        </div>
        
        <p className={`text-sm mb-4 leading-relaxed ${isPast ? 'text-gray-500' : 'text-gray-600'}`}>
          {event.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-primary" />
            <span className={isPast ? 'text-gray-500' : 'text-gray-700'}>{event.englishDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-secondary" />
            <span className={isPast ? 'text-gray-500' : 'text-gray-700'}>{event.nepaliDate}</span>
          </div>
          {event.region && (
            <div className="flex items-center gap-2 text-sm">
              <Star className="w-4 h-4 text-accent" />
              <span className={isPast ? 'text-gray-500' : 'text-gray-700'}>{event.region}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
        
        <div className={`h-2 bg-gradient-to-r ${getGradient(event.importance)} rounded-full`}></div>
      </div>
    </Cards>
  );
};

export default FestivalCard;