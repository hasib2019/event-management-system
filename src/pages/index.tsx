import React, { useState, useMemo } from 'react';
import Layout from '@/components/Layout';
import EventCard from '@/components/EventCard';
import SearchFilter from '@/components/SearchFilter';
import { useEvents } from '@/context/EventContext';

export default function Home() {
  const { events } = useEvents();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [events, searchTerm, selectedCategory]);

  const upcomingEvents = filteredEvents.filter(event => 
    new Date(event.date) >= new Date()
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <Layout title="Home - Event Management System">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Amazing Events
          </h1>
          <p className="text-xl text-gray-600">
            Find and join events that match your interests
          </p>
        </div>

        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Upcoming Events ({upcomingEvents.length})
          </h2>
        </div>

        {upcomingEvents.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500">
              {searchTerm || selectedCategory !== 'All'
                ? 'Try adjusting your search or filter criteria.'
                : 'No upcoming events at the moment.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
