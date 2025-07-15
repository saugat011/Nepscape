'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Plus, Calendar, MapPin, Save, Trash2 } from 'lucide-react';
import { Itinerary, ItineraryDay } from './types';
import { sampleItinerary } from './data';
import { saveItinerary, loadItinerary, generateId } from './utils/storage';
import ItineraryCard from './components/ItineraryCard';
import PDFExport from './components/PDFExport';

const ItineraryBuilder: React.FC = () => {
  const [itinerary, setItinerary] = useState<Itinerary>(sampleItinerary);
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setIsClient(true);
    const saved = loadItinerary();
    if (saved) {
      setItinerary(saved);
    }
  }, []);

  const handleSaveItinerary = () => {
    saveItinerary(itinerary);
    // Show success message (you could add a toast here)
    alert('Itinerary saved successfully!');
  };

  const handleAddDay = () => {
    const newDay: ItineraryDay = {
      id: generateId(),
      date: new Date(Date.now() + (itinerary.days.length * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      title: `Day ${itinerary.days.length + 1}`,
      activities: []
    };

    setItinerary(prev => ({
      ...prev,
      days: [...prev.days, newDay]
    }));
  };

  const handleUpdateDay = (updatedDay: ItineraryDay) => {
    setItinerary(prev => ({
      ...prev,
      days: prev.days.map(day => day.id === updatedDay.id ? updatedDay : day)
    }));
  };

  const handleDeleteDay = (dayId: string) => {
    if (itinerary.days.length > 1) {
      setItinerary(prev => ({
        ...prev,
        days: prev.days.filter(day => day.id !== dayId)
      }));
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceDayId = source.droppableId;
    const destinationDayId = destination.droppableId;

    if (sourceDayId === destinationDayId) {
      // Reordering within the same day
      const day = itinerary.days.find(d => d.id === sourceDayId);
      if (!day) return;

      const newActivities = Array.from(day.activities);
      const [reorderedItem] = newActivities.splice(source.index, 1);
      newActivities.splice(destination.index, 0, reorderedItem);

      handleUpdateDay({
        ...day,
        activities: newActivities
      });
    } else {
      // Moving between different days
      const sourceDay = itinerary.days.find(d => d.id === sourceDayId);
      const destinationDay = itinerary.days.find(d => d.id === destinationDayId);
      
      if (!sourceDay || !destinationDay) return;

      const sourceActivities = Array.from(sourceDay.activities);
      const destinationActivities = Array.from(destinationDay.activities);
      const [movedItem] = sourceActivities.splice(source.index, 1);
      destinationActivities.splice(destination.index, 0, movedItem);

      setItinerary(prev => ({
        ...prev,
        days: prev.days.map(day => {
          if (day.id === sourceDayId) {
            return { ...day, activities: sourceActivities };
          }
          if (day.id === destinationDayId) {
            return { ...day, activities: destinationActivities };
          }
          return day;
        })
      }));
    }
  };

  const handleUpdateItineraryTitle = (title: string) => {
    setItinerary(prev => ({ ...prev, title }));
  };

  const handleUpdateItineraryDestination = (destination: string) => {
    setItinerary(prev => ({ ...prev, destination }));
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-8 w-8 text-blue-600" />
                  <h1 className="text-3xl font-bold text-gray-800">Nepscape</h1>
                </div>
                <span className="text-gray-400">|</span>
                <div>
                  <input
                    type="text"
                    value={itinerary.title}
                    onChange={(e) => handleUpdateItineraryTitle(e.target.value)}
                    className="text-xl font-semibold text-gray-800 bg-transparent border-none outline-none hover:bg-gray-50 px-2 py-1 rounded transition-colors"
                  />
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <input
                      type="text"
                      value={itinerary.destination}
                      onChange={(e) => handleUpdateItineraryDestination(e.target.value)}
                      className="text-gray-600 bg-transparent border-none outline-none hover:bg-gray-50 px-2 py-1 rounded transition-colors"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={handleSaveItinerary}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg"
                >
                  <Save className="h-4 w-4" />
                  Save Itinerary
                </button>
                <PDFExport itinerary={itinerary} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-800">Your Itinerary</h2>
              <span className="text-gray-500">
                {itinerary.startDate} to {itinerary.endDate}
              </span>
            </div>
            <button
              onClick={handleAddDay}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              <Plus className="h-4 w-4" />
              Add Day
            </button>
          </div>
        </div>

        {/* Mobile: Tabs for different days */}
        <div className="md:hidden mb-6">
          <div className="flex overflow-x-auto gap-2 pb-2">
            {itinerary.days.map((day, index) => (
              <button
                key={day.id}
                onClick={() => setActiveTab(index)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Day {index + 1}
              </button>
            ))}
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          {/* Desktop: Grid layout */}
          <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {itinerary.days.map((day, index) => (
              <ItineraryCard
                key={day.id}
                day={day}
                dayIndex={index}
                onUpdateDay={handleUpdateDay}
                onDeleteDay={handleDeleteDay}
              />
            ))}
          </div>

          {/* Mobile: Single card view */}
          <div className="md:hidden">
            {itinerary.days.map((day, index) => (
              <div
                key={day.id}
                className={index === activeTab ? 'block' : 'hidden'}
              >
                <ItineraryCard
                  day={day}
                  dayIndex={index}
                  onUpdateDay={handleUpdateDay}
                  onDeleteDay={handleDeleteDay}
                />
              </div>
            ))}
          </div>
        </DragDropContext>

        {itinerary.days.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No days in your itinerary yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start building your perfect trip by adding your first day
            </p>
            <button
              onClick={handleAddDay}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              <Plus className="h-5 w-5" />
              Add Your First Day
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryBuilder;