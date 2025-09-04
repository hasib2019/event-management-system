export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: 'Conference' | 'Workshop' | 'Meetup' | 'Networking' | 'Other';
  createdBy?: string; // For tracking user-created events
  rsvpCount: number;
  hasRSVP?: boolean; // For tracking if current user has RSVP'd
}

export interface EventContextType {
  events: Event[];
  addEvent: (event: Omit<Event, 'id' | 'rsvpCount'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  toggleRSVP: (eventId: string) => void;
  getUserEvents: () => Event[];
}

export interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export interface EventCardProps {
  event: Event;
  showActions?: boolean;
  onDelete?: (id: string) => void;
}
