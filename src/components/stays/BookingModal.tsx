'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, MapPin, Star, CreditCard, Check } from 'lucide-react';
import { Stay, BookingFormData } from '@/app/(user)/book/stays/types';

interface BookingModalProps {
  guide: Stay | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (bookingData: BookingFormData) => void;
}

export default function BookingModal({ guide: stay, isOpen, onClose, onConfirm }: BookingModalProps) {
  const [bookingData, setBookingData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    checkInDate: '',
    checkOutDate: '',
    guests: 1,
    specialRequests: '',
    roomType: '',
  });
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!bookingData.checkInDate) newErrors.checkIn = 'Check-in date is required';
    if (!bookingData.checkOutDate) newErrors.checkOut = 'Check-out date is required';
    if (bookingData.guests < 1) newErrors.guests = 'At least 1 guest is required';

    if (bookingData.checkInDate && bookingData.checkOutDate) {
      const checkIn = new Date(bookingData.checkInDate);
      const checkOut = new Date(bookingData.checkOutDate);
      if (checkOut <= checkIn) {
        newErrors.checkOut = 'Check-out must be after check-in';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!bookingData.name) newErrors.name = 'Name is required';
    if (!bookingData.email) newErrors.email = 'Email is required';
    if (!bookingData.phone) newErrors.phone = 'Phone is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (bookingData.email && !emailRegex.test(bookingData.email)) {
      newErrors.email = 'Valid email is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleConfirm = () => {
    if (validateStep2()) {
      onConfirm(bookingData);
      setStep(1);
      setBookingData({
        name: '',
        email: '',
        phone: '',
        checkInDate: '',
        checkOutDate: '',
        guests: 1,
        specialRequests: '',
        roomType: '',
      });
    }
  };

  const calculateNights = () => {
    if (bookingData.checkInDate && bookingData.checkOutDate) {
      const checkIn = new Date(bookingData.checkInDate);
      const checkOut = new Date(bookingData.checkOutDate);
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const totalCost = stay ? calculateNights() * stay.price : 0;

  if (!stay) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold text-[#111827]">Book Your Stay</h2>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-[#6B7280]" />
                  <span className="text-[#6B7280]">{stay.name}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#F9FAFB] rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Step Indicator */}
            <div className="px-6 py-4 bg-[#F9FAFB]">
              <div className="flex items-center justify-center space-x-4">
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= stepNumber 
                        ? 'bg-[#3B82F6] text-white' 
                        : 'bg-gray-200 text-[#6B7280]'
                    }`}>
                      {step > stepNumber ? <Check className="w-4 h-4" /> : stepNumber}
                    </div>
                    {stepNumber < 3 && (
                      <div className={`w-12 h-1 mx-2 ${
                        step > stepNumber ? 'bg-[#3B82F6]' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center mt-2 text-sm text-[#6B7280]">
                {step === 1 && 'Select Dates & Guests'}
                {step === 2 && 'Contact Information'}
                {step === 3 && 'Confirm & Pay'}
              </div>
            </div>

            <div className="p-6">
              {/* Step 1: Dates & Guests */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Check-in Date
                      </label>
                      <input
                        type="date"
                        value={bookingData.checkInDate}
                        onChange={(e) => setBookingData({...bookingData, checkInDate: e.target.value})}
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent ${
                          errors.checkIn ? 'border-red-500' : 'border-gray-200'
                        }`}
                      />
                      {errors.checkIn && <p className="text-red-500 text-sm mt-1">{errors.checkIn}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Check-out Date
                      </label>
                      <input
                        type="date"
                        value={bookingData.checkOutDate}
                        onChange={(e) => setBookingData({ ...bookingData, checkOutDate: e.target.value })}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent ${
                          errors.checkOut ? 'border-red-500' : 'border-gray-200'
                        }`}
                      />
                      {errors.checkOut && <p className="text-red-500 text-sm mt-1">{errors.checkOut}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      <Users className="w-4 h-4 inline mr-1" />
                      Number of Guests
                    </label>
                    <select
                      value={bookingData.guests}
                      onChange={(e) => setBookingData({...bookingData, guests: parseInt(e.target.value)})}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent ${
                        errors.guests ? 'border-red-500' : 'border-gray-200'
                      }`}
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                    {errors.guests && <p className="text-red-500 text-sm mt-1">{errors.guests}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      value={bookingData.specialRequests}
                      onChange={(e) => setBookingData({...bookingData, specialRequests: e.target.value})}
                      rows={3}
                      placeholder="Any special requirements or requests..."
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                    />
                  </div>

                  {calculateNights() > 0 && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-[#111827] mb-2">Booking Summary</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Nights:</span>
                          <span>{calculateNights()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Price per night:</span>
                          <span>${stay.price}</span>
                        </div>
                        <div className="flex justify-between font-medium text-lg pt-2 border-t">
                          <span>Total:</span>
                          <span>${totalCost}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Contact Information */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">Full Name</label>
                    <input
                      type="text"
                      value={bookingData.name}
                      onChange={(e) => setBookingData({
                        ...bookingData,
                        name: e.target.value
                      })}
                      placeholder="Enter your full name"
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent ${
                        errors.name ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">Email Address</label>
                    <input
                      type="email"
                      value={bookingData.email}
                      onChange={(e) => setBookingData({
                        ...bookingData,
                        email: e.target.value
                      })}
                      placeholder="Enter your email address"
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({
                        ...bookingData,
                        phone: e.target.value
                      })}
                      placeholder="Enter your phone number"
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="bg-[#F9FAFB] p-4 rounded-lg">
                    <h4 className="font-medium text-[#111827] mb-3">Booking Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Stay:</span>
                        <span className="font-medium">{stay.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Check-in:</span>
                        <span>{new Date(bookingData.checkInDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Check-out:</span>
                        <span>{new Date(bookingData.checkOutDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Guests:</span>
                        <span>{bookingData.guests}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Nights:</span>
                        <span>{calculateNights()}</span>
                      </div>
                      <div className="flex justify-between font-medium text-lg pt-2 border-t">
                        <span>Total Amount:</span>
                        <span>${totalCost}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CreditCard className="w-5 h-5 text-[#F59E0B] mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-900">Payment Information</h4>
                        <p className="text-sm text-amber-700 mt-1">
                          This is a demo booking. In a real application, secure payment processing would be integrated here.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8 pt-6 border-t">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 border border-gray-200 text-[#111827] rounded-lg hover:bg-[#F9FAFB] transition-colors"
                  >
                    Back
                  </button>
                )}
                <div className="flex-1" />
                {step < 3 ? (
                  <button
                    onClick={handleNext}
                    className="px-8 py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg font-medium transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleConfirm}
                    className="px-8 py-3 bg-[#10B981] hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Confirm Booking
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}