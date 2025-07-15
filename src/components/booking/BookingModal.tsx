'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import {
  X,
  MapPin,
  Star,
  Shield,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/booking/button';
import { Input } from '@/components/booking/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/booking/card';
import { Guide, BookingFormData } from '@/app/(user)/book/guides/types';
import Image from 'next/image';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  date: z.string().min(1, 'Please select a date'),
  duration: z.coerce.number().min(1, 'Please select duration'),
  groupSize: z.coerce.number().min(1, 'Group size must be at least 1').max(20, 'Maximum group size is 20'),
  specialRequests: z.string().optional(),
  serviceType: z.string().min(1, 'Please select a service type')
});

interface BookingModalProps {
  guide: Guide | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (bookingData: BookingFormData) => void;
}

export default function BookingModal({ guide, isOpen, onClose, onConfirm }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema)
  });

  const watchedValues = watch();

  useEffect(() => {
    if (guide && watchedValues.duration && watchedValues.groupSize) {
      const basePrice = guide.price * watchedValues.duration;
      const groupMultiplier = watchedValues.groupSize > 4 ? 1.2 : 1;
      setTotalPrice(Math.round(basePrice * groupMultiplier));
    }
  }, [guide, watchedValues.duration, watchedValues.groupSize]);

  const onSubmit = (data: BookingFormData) => {
    onConfirm({
      ...data,
      date: new Date(data.date)
    });
    reset();
    setStep(1);
    onClose();
  };

  const handleClose = () => {
    reset();
    setStep(1);
    onClose();
  };

  if (!isOpen || !guide) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-text">Book Your Guide</h2>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Guide Info */}
          <div>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden">
                    <Image src={guide.image} alt={guide.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-text">{guide.name}</h3>
                      {guide.verified && <Shield className="w-4 h-4 text-secondary" />}
                    </div>
                    <div className="flex items-center gap-1 text-muted text-sm mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{guide.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="font-semibold text-sm">{guide.rating}</span>
                      <span className="text-xs text-muted">({guide.totalReviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted">Base Price</span>
                    <span className="font-semibold">${guide.price}/day</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted">Experience</span>
                    <span className="font-semibold">{guide.experience}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted">Response Time</span>
                    <span className="font-semibold">{guide.responseTime}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {guide.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price Summary */}
            {totalPrice > 0 && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Price Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Base price × {watchedValues.duration || 1} day(s)</span>
                      <span>${guide.price * (watchedValues.duration || 1)}</span>
                    </div>
                    {watchedValues.groupSize > 4 && (
                      <div className="flex justify-between text-sm text-muted">
                        <span>Large group surcharge (20%)</span>
                        <span>
                          +${Math.round(guide.price * watchedValues.duration * 0.2)}
                        </span>
                      </div>
                    )}
                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">${totalPrice}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Form */}
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Full Name *</label>
                  <Input {...register('name')} placeholder="Enter your full name" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1">Email *</label>
                  <Input type="email" {...register('email')} placeholder="Enter your email" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Phone Number *</label>
                  <Input {...register('phone')} placeholder="Enter your phone number" />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1">Preferred Date *</label>
                  <Input type="date" {...register('date')} min={format(new Date(), 'yyyy-MM-dd')} />
                  {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Duration (days) *</label>
                  <select
                    {...register('duration')}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select duration</option>
                    <option value="1">1 Day</option>
                    <option value="2">2 Days</option>
                    <option value="3">3 Days</option>
                    <option value="5">5 Days</option>
                    <option value="7">1 Week</option>
                    <option value="14">2 Weeks</option>
                  </select>
                  {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1">Group Size *</label>
                  <Input type="number" min="1" max="20" {...register('groupSize')} placeholder="Number of people" />
                  {errors.groupSize && <p className="text-red-500 text-xs mt-1">{errors.groupSize.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1">Service Type *</label>
                <select
                  {...register('serviceType')}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select service type</option>
                  {guide.services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                {errors.serviceType && (
                  <p className="text-red-500 text-xs mt-1">{errors.serviceType.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1">Special Requests</label>
                <textarea
                  {...register('specialRequests')}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Any special requirements or requests..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-primary hover:bg-hover">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirm Booking
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
