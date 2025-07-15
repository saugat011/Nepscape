'use client';

import { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Clock, MapPin, Edit2, Trash2, Plus, GripVertical } from 'lucide-react';
import { ItineraryDay, Activity } from '../types';
import { formatTime, formatDuration } from '../utils/storage';
import { activityTypes } from '../data';
import ActivityForm from './ActivityForm';
import MapEmbed from './MapEmbed';

interface ItineraryCardProps {
  day: ItineraryDay;
  dayIndex: number;
  onUpdateDay: (day: ItineraryDay) => void;
  onDeleteDay: (dayId: string) => void;
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({
  day,
  dayIndex,
  onUpdateDay,
  onDeleteDay
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | undefined>();
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [showMap, setShowMap] = useState(false);

  const handleAddActivity = () => {
    setEditingActivity(undefined);
    setIsFormOpen(true);
  };

  const handleEditActivity = (activity: Activity) => {
    setEditingActivity(activity);
    setIsFormOpen(true);
  };

  const handleSaveActivity = (activity: Activity) => {
    const updatedActivities = editingActivity
      ? day.activities.map(a => a.id === activity.id ? activity : a)
      : [...day.activities, activity];
    
    onUpdateDay({
      ...day,
      activities: updatedActivities
    });
    setIsFormOpen(false);
    setEditingActivity(undefined);
  };

  const handleDeleteActivity = (activityId: string) => {
    const updatedActivities = day.activities.filter(a => a.id !== activityId);
    onUpdateDay({
      ...day,
      activities: updatedActivities
    });
  };

  const handleShowMap = (location: string) => {
    setSelectedLocation(location);
    setShowMap(true);
  };

  const getActivityTypeColor = (type: Activity['type']) => {
    return activityTypes.find(t => t.value === type)?.color || '#6B7280';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{day.title}</h3>
            <p className="text-gray-600 mt-1">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddActivity}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              <Plus className="h-4 w-4" />
              Add Activity
            </button>
            <button
              onClick={() => onDeleteDay(day.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <Droppable droppableId={day.id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`p-6 space-y-4 ${snapshot.isDraggingOver ? 'bg-blue-50' : ''}`}
          >
            {day.activities.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No activities planned for this day</p>
                <p className="text-sm mt-2">Click "Add Activity" to get started</p>
              </div>
            ) : (
              day.activities.map((activity, index) => (
                <Draggable
                  key={activity.id}
                  draggableId={activity.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`bg-gray-50 rounded-xl p-4 transition-all duration-200 ${
                        snapshot.isDragging ? 'shadow-lg rotate-1' : 'hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          {...provided.dragHandleProps}
                          className="mt-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
                        >
                          <GripVertical className="h-5 w-5" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-sm font-medium text-gray-600">
                                  {formatTime(activity.time)}
                                </span>
                                <span
                                  className="px-2 py-1 text-xs font-medium text-white rounded-full"
                                  style={{ backgroundColor: getActivityTypeColor(activity.type) }}
                                >
                                  {activityTypes.find(t => t.value === activity.type)?.label}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {formatDuration(activity.duration)}
                                </span>
                              </div>
                              
                              <h4 className="font-semibold text-gray-800 mb-2">{activity.title}</h4>
                              
                              {activity.description && (
                                <p className="text-gray-600 text-sm mb-2">{activity.description}</p>
                              )}
                              
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <MapPin className="h-4 w-4" />
                                <button
                                  onClick={() => handleShowMap(activity.location)}
                                  className="text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                  {activity.location}
                                </button>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 ml-4">
                              <button
                                onClick={() => handleEditActivity(activity)}
                                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteActivity(activity.id)}
                                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <ActivityForm
        activity={editingActivity}
        onSave={handleSaveActivity}
        onCancel={() => {
          setIsFormOpen(false);
          setEditingActivity(undefined);
        }}
        isOpen={isFormOpen}
      />

      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Location Map</h2>
                <button
                  onClick={() => setShowMap(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <MapEmbed location={selectedLocation} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryCard;