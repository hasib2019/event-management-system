import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Event, EventFormData, EventContextType } from '@/types/event';

const EventContext = createContext<EventContextType | undefined>(undefined);

// Mock initial events
const INITIAL_EVENTS: Event[] = [
  {
    id: '1',
    title: 'React Conference 2025',
    description: 'A comprehensive conference about React and modern web development',
    date: '2025-10-15',
    location: 'San Francisco, CA',
    category: 'Conference',
    createdBy: 'system',
    rsvpCount: 150,
    rsvpUsers: []
  },
  {
    id: '2',
    title: 'TypeScript Workshop',
    description: 'Learn advanced TypeScript concepts and best practices',
    date: '2025-09-20',
    location: 'New York, NY',
    category: 'Workshop',
    createdBy: 'system',
    rsvpCount: 50,
    rsvpUsers: []
  },
  {
    id: '3',
    title: 'Web Dev Meetup',
    description: 'Monthly meetup for web developers to network and share knowledge',
    date: '2025-09-10',
    location: 'Los Angeles, CA',
    category: 'Meetup',
    createdBy: 'system',
    rsvpCount: 75,
    rsvpUsers: []
  }
];

interface EventProviderProps {
  children: ReactNode;
}

export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentUserId] = useState('user-123'); // Simulated user ID

  useEffect(() => {
    // Load events from localStorage or use initial events
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      setEvents(INITIAL_EVENTS);
    }
  }, []);

  useEffect(() => {
    // Save events to localStorage whenever events change
    if (events.length > 0) {
      localStorage.setItem('events', JSON.stringify(events));
    }
  }, [events]);

  const addEvent = (eventData: EventFormData) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      createdBy: currentUserId,
      rsvpCount: 0,
      rsvpUsers: []
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  const updateEvent = (id: string, eventData: EventFormData) => {
    setEvents(prev => prev.map(event => 
      event.id === id 
        ? { ...event, ...eventData }
        : event
    ));
  };

  const toggleRSVP = (id: string, userId: string) => {
    setEvents(prev => prev.map(event => {
      if (event.id === id) {
        const rsvpUsers = event.rsvpUsers || [];
        const isRSVPed = rsvpUsers.includes(userId);
        
        if (isRSVPed) {
          return {
            ...event,
            rsvpUsers: rsvpUsers.filter(uid => uid !== userId),
            rsvpCount: (event.rsvpCount || 1) - 1
          };
        } else {
          return {
            ...event,
            rsvpUsers: [...rsvpUsers, userId],
            rsvpCount: (event.rsvpCount || 0) + 1
          };
        }
      }
      return event;
    }));
  };

  const getEventById = (id: string): Event | undefined => {
    return events.find(event => event.id === id);
  };

  const myEvents = events.filter(event => event.createdBy === currentUserId);

  const value: EventContextType = {
    events,
    myEvents,
    addEvent,
    deleteEvent,
    updateEvent,
    toggleRSVP,
    getEventById
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = (): EventContextType => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
