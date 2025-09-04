import React, { createContext, useContext, useState, useEffect } from 'react';
import { Event, EventContextType } from '@/types/event';

const EventContext = createContext<EventContextType | undefined>(undefined);

// Mock initial data
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'React Conference 2025',
    description: 'A comprehensive conference covering the latest in React development, featuring industry experts and hands-on workshops.',
    date: '2025-09-15',
    location: 'San Francisco, CA',
    category: 'Conference',
    rsvpCount: 45,
    hasRSVP: false,
  },
  {
    id: '2',
    title: 'JavaScript Workshop',
    description: 'Interactive workshop focusing on modern JavaScript ES6+ features, async programming, and best practices.',
    date: '2025-09-20',
    location: 'New York, NY',
    category: 'Workshop',
    rsvpCount: 23,
    hasRSVP: false,
  },
  {
    id: '3',
    title: 'Tech Meetup',
    description: 'Monthly networking event for tech professionals. Great opportunity to meet like-minded developers and entrepreneurs.',
    date: '2025-09-25',
    location: 'Austin, TX',
    category: 'Meetup',
    rsvpCount: 67,
    hasRSVP: true,
  },
  {
    id: '4',
    title: 'Web Development Bootcamp',
    description: 'Intensive 3-day bootcamp covering full-stack web development with React, Node.js, and MongoDB.',
    date: '2025-10-05',
    location: 'Seattle, WA',
    category: 'Workshop',
    rsvpCount: 89,
    hasRSVP: false,
  },
  {
    id: '5',
    title: 'AI & Machine Learning Summit',
    description: 'Explore the latest trends in AI and ML with leading researchers and industry practitioners.',
    date: '2025-10-12',
    location: 'Boston, MA',
    category: 'Conference',
    rsvpCount: 156,
    hasRSVP: false,
  },
];

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);

  // Load events from localStorage on mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents);
        setEvents(parsedEvents);
      } catch (error) {
        console.error('Failed to parse events from localStorage:', error);
        setEvents(mockEvents);
      }
    } else {
      setEvents(mockEvents);
    }
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem('events', JSON.stringify(events));
    }
  }, [events]);

  const addEvent = (eventData: Omit<Event, 'id' | 'rsvpCount'>) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      rsvpCount: 0,
      createdBy: 'current-user', // In a real app, this would be the authenticated user ID
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const updateEvent = (id: string, eventData: Partial<Event>) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === id ? { ...event, ...eventData } : event
      )
    );
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  const toggleRSVP = (eventId: string) => {
    setEvents(prev => 
      prev.map(event => {
        if (event.id === eventId) {
          const hasRSVP = !event.hasRSVP;
          return {
            ...event,
            hasRSVP,
            rsvpCount: hasRSVP ? event.rsvpCount + 1 : event.rsvpCount - 1,
          };
        }
        return event;
      })
    );
  };

  const getUserEvents = () => {
    return events.filter(event => event.createdBy === 'current-user');
  };

  const value: EventContextType = {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    toggleRSVP,
    getUserEvents,
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}
