export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: 'Conference' | 'Workshop' | 'Meetup';
  createdBy?: string;
  rsvpCount?: number;
  rsvpUsers?: string[];
}

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  location: string;
  category: 'Conference' | 'Workshop' | 'Meetup';
}

export interface EventContextType {
  events: Event[];
  myEvents: Event[];
  addEvent: (event: EventFormData) => void;
  deleteEvent: (id: string) => void;
  updateEvent: (id: string, event: EventFormData) => void;
  toggleRSVP: (id: string, userId: string) => void;
  getEventById: (id: string) => Event | undefined;
}
