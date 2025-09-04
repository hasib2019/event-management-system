import React from 'react';
import Link from 'next/link';
import { EventCardProps } from '@/types/event';
import { useEvents } from '@/context/EventContext';

export default function EventCard({ event, showActions = false, onDelete }: EventCardProps) {
  const { toggleRSVP } = useEvents();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Conference: 'bg-blue-100 text-blue-800',
      Workshop: 'bg-green-100 text-green-800',
      Meetup: 'bg-purple-100 text-purple-800',
      Networking: 'bg-orange-100 text-orange-800',
      Other: 'bg-gray-100 text-gray-800',
    };
    return colors[category as keyof typeof colors] || colors.Other;
  };

  const isUpcoming = new Date(event.date) >= new Date();

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        {/* Header with title and category */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
            {event.title}
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
            {event.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {event.description}
        </p>

        {/* Event details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(event.date)} at {formatTime(event.date)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{event.rsvpCount} attending</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Link
              href={`/events/${event.id}`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              View Details
            </Link>
            
            {isUpcoming && (
              <button
                onClick={() => toggleRSVP(event.id)}
                className={`inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  event.hasRSVP
                    ? 'border-red-300 text-red-700 bg-red-50 hover:bg-red-100 focus:ring-red-500'
                    : 'border-green-300 text-green-700 bg-green-50 hover:bg-green-100 focus:ring-green-500'
                }`}
              >
                {event.hasRSVP ? 'Cancel RSVP' : 'RSVP'}
              </button>
            )}
          </div>

          {showActions && onDelete && (
            <div className="flex space-x-2">
              <Link
                href={`/edit-event/${event.id}`}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Edit
              </Link>
              <button
                onClick={() => onDelete(event.id)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Status indicator */}
        {!isUpcoming && (
          <div className="mt-3 flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Event has ended</span>
          </div>
        )}
      </div>
    </div>
  );
}
