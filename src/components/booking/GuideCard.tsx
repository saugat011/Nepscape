'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Star, 
  MapPin, 
  Languages, 
  Clock, 
  Shield, 
  Users, 
  MessageCircle,
  Calendar,
  Award,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/booking/button';
import { Card, CardContent } from '@/components/booking/card';
import { Guide } from '@/app/(user)/book/guides/types';

interface GuideCardProps {
  guide: Guide;
  index: number;
  onBookNow: (guide: Guide) => void;
  onViewProfile: (guide: Guide) => void;
}

export default function GuideCard({ guide, index, onBookNow, onViewProfile }: GuideCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group h-full">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={guide.image}
            alt={guide.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            {guide.verified && (
              <div className="bg-secondary text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Verified
              </div>
            )}
            <div className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold">
              ${guide.price}/day
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3 fill-accent text-accent" />
              <span className="text-xs font-semibold">{guide.rating}</span>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-text mb-1">{guide.name}</h3>
              <div className="flex items-center gap-1 text-black text-sm">
                <MapPin className="w-4 h-4" />
                <span>{guide.location}</span>
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-black text-sm">
              <Languages className="w-4 h-4" />
              <span>{guide.languages.join(', ')}</span>
            </div>
            <div className="flex items-center gap-2 text-black text-sm">
              <Clock className="w-4 h-4" />
              <span>{guide.experience} experience</span>
            </div>
            <div className="flex items-center gap-2 text-black text-sm">
              <Users className="w-4 h-4" />
              <span>{guide.completedTours} completed tours</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-black mb-4 line-clamp-2">{guide.description}</p>

          {/* Specialties */}
          <div className="flex flex-wrap gap-2 mb-4">
            {guide.specialties.slice(0, 3).map((specialty) => (
              <span
                key={specialty}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
              >
                {specialty}
              </span>
            ))}
            {guide.specialties.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-muted text-xs rounded-md">
                +{guide.specialties.length - 3} more
              </span>
            )}
          </div>

          {/* Stats Row */}
          <div className="flex items-center justify-between mb-4 text-xs text-black">
            <div className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              <span>Responds {guide.responseTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="w-3 h-3" />
              <span>{guide.certifications.length} certifications</span>
            </div>
          </div>

          {/* Reviews */}
          <div className="flex items-center gap-4 mb-6 pb-4 border-b">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="font-semibold text-sm">{guide.rating}</span>
            </div>
            <span className="text-xs text-black">({guide.totalReviews} reviews)</span>
            <div className="flex items-center gap-1 text-xs text-secondary">
              <CheckCircle className="w-3 h-3" />
              <span>Available today</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              onClick={() => onBookNow(guide)}
              className="flex-1 bg-primary hover:bg-hover text-white font-semibold"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Now
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onViewProfile(guide)}
              className="px-4"
            >
              View Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}