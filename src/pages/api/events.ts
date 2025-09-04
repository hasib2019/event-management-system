import type { NextApiRequest, NextApiResponse } from 'next';
import { Event } from '@/types/event';

// Mock data for API
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'React Conference 2025',
    description: 'A comprehensive conference covering the latest in React development, featuring industry experts and hands-on workshops.',
    date: '2025-09-15T10:00:00',
    location: 'San Francisco, CA',
    category: 'Conference',
    rsvpCount: 45,
    hasRSVP: false,
  },
  {
    id: '2',
    title: 'JavaScript Workshop',
    description: 'Interactive workshop focusing on modern JavaScript ES6+ features, async programming, and best practices.',
    date: '2025-09-20T14:00:00',
    location: 'New York, NY',
    category: 'Workshop',
    rsvpCount: 23,
    hasRSVP: false,
  },
  {
    id: '3',
    title: 'Tech Meetup',
    description: 'Monthly networking event for tech professionals. Great opportunity to meet like-minded developers and entrepreneurs.',
    date: '2025-09-25T18:00:00',
    location: 'Austin, TX',
    category: 'Meetup',
    rsvpCount: 67,
    hasRSVP: true,
  },
  {
    id: '4',
    title: 'Web Development Bootcamp',
    description: 'Intensive 3-day bootcamp covering full-stack web development with React, Node.js, and MongoDB.',
    date: '2025-10-05T09:00:00',
    location: 'Seattle, WA',
    category: 'Workshop',
    rsvpCount: 89,
    hasRSVP: false,
  },
  {
    id: '5',
    title: 'AI & Machine Learning Summit',
    description: 'Explore the latest trends in AI and ML with leading researchers and industry practitioners.',
    date: '2025-10-12T08:00:00',
    location: 'Boston, MA',
    category: 'Conference',
    rsvpCount: 156,
    hasRSVP: false,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse<Event[] | { message: string }>) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Return all events
      res.status(200).json(mockEvents);
      break;
    
    case 'POST':
      // Create a new event (in a real app, this would save to a database)
      const newEvent: Event = {
        id: Date.now().toString(),
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        category: req.body.category,
        rsvpCount: 0,
        hasRSVP: false,
        createdBy: 'current-user',
      };
      
      // In a real app, you would save this to a database
      mockEvents.push(newEvent);
      
      res.status(201).json([newEvent]);
      break;
    
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ message: `Method ${method} not allowed` });
  }
}
