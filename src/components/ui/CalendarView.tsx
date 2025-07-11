import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Cards } from './Cards';
import { Button } from './Button';

const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const nepaliMonths = [
    'Baishakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin',
    'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
  ];
  
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };
  
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);
  
  const festivalDays = [10, 15, 23, 28]; // Sample festival days
  
  return (
    <Cards className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            Calendar View
          </h3>
          <p className="text-gray-600 mt-1">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()} • {nepaliMonths[currentDate.getMonth()]} 2082
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigateMonth('prev')}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigateMonth('next')}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {emptyDays.map(day => (
          <div key={`empty-${day}`} className="p-2 h-10"></div>
        ))}
        {days.map(day => (
          <div
            key={day}
            className={`p-2 h-10 flex items-center justify-center text-sm rounded-lg cursor-pointer transition-all duration-200 ${
              festivalDays.includes(day)
                ? 'bg-primary text-white shadow-lg transform hover:scale-110'
                : 'hover:bg-gray-100'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">Festival Days Legend</h4>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-4 h-4 bg-primary rounded"></div>
          <span>Festival Day</span>
        </div>
      </div>
    </Cards>
  );
};

export default CalendarView;