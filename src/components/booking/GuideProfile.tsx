'use client';

import Image from 'next/image';
import { 
  X, 
  Star, 
  MapPin, 
  Languages, 
  Clock, 
  Shield, 
  Users, 
  Award,
  Calendar,
  MessageCircle,
  CheckCircle,
  Phone,
  Mail
} from 'lucide-react';
import { Button } from '@/components/booking/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/booking/card';
import { Guide } from '@/app/(user)/book/guides/types';

interface GuideProfileProps {
  guide: Guide | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (guide: Guide) => void;
}

export default function GuideProfile({ guide, isOpen, onClose, onBookNow }: GuideProfileProps) {
  if (!isOpen || !guide) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <div className="h-48 bg-gradient-to-r from-primary to-hover"></div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 "
          >
            <X className="w-5 h-5" />
          </Button>
          
          {/* Profile Info Overlay */}
          <div className="absolute -bottom-16 left-6 flex items-end gap-4">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image
                src={guide.image}
                alt={guide.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="pb-4">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-white">{guide.name}</h1>
                {guide.verified && (
                  <Shield className="w-5 h-5 text-secondary" />
                )}
              </div>
              <div className="flex items-center gap-1 text-black/90 mb-2">
                <MapPin className="w-4 h-4" />
                <span>{guide.location}</span>
              </div>
              <div className="flex items-center gap-4 text-black/90 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-semibold">{guide.rating}</span>
                  <span>({guide.totalReviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{guide.completedTours} tours</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-20 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted leading-relaxed">{guide.aboutMe}</p>
                </CardContent>
              </Card>

              {/* Services */}
              <Card>
                <CardHeader>
                  <CardTitle>Services Offered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {guide.services.map((service) => (
                      <div key={service} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-secondary" />
                        <span className="text-sm font-medium">{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Specialties */}
              <Card>
                <CardHeader>
                  <CardTitle>Specialties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {guide.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-3 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Certifications & Qualifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {guide.certifications.map((cert) => (
                      <div key={cert} className="flex items-center gap-2 p-2 border rounded-lg">
                        <Award className="w-4 h-4 text-accent" />
                        <span className="font-medium">{cert}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted">Price per day</span>
                    <span className="font-bold text-lg text-primary">${guide.price}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted" />
                    <span>{guide.experience} experience</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Languages className="w-4 h-4 text-muted" />
                    <span>{guide.languages.join(', ')}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <MessageCircle className="w-4 h-4 text-muted" />
                    <span>Responds {guide.responseTime}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted" />
                    <span>Available {guide.availability.length} days/week</span>
                  </div>
                </CardContent>
              </Card>

              {/* Availability */}
              <Card>
                <CardHeader>
                  <CardTitle>Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                      <div
                        key={day}
                        className={`p-2 text-center text-xs rounded ${
                          guide.availability.includes(day)
                            ? 'bg-secondary/10 text-secondary font-medium'
                            : 'bg-gray-100 text-muted'
                        }`}
                      >
                        {day.slice(0, 3)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={() => onBookNow(guide)}
                  className="w-full bg-primary hover:bg-hover text-black font-semibold py-3"
                  size="lg"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  size="lg"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-1" />
                    Email
                  </Button>
                </div>
              </div>

              {/* Trust Indicators */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-secondary">
                      <CheckCircle className="w-4 h-4" />
                      <span>Identity verified</span>
                    </div>
                    <div className="flex items-center gap-2 text-secondary">
                      <CheckCircle className="w-4 h-4" />
                      <span>Background checked</span>
                    </div>
                    <div className="flex items-center gap-2 text-secondary">
                      <CheckCircle className="w-4 h-4" />
                      <span>Licensed guide</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}