import type { NextApiRequest, NextApiResponse } from 'next'
import { Event } from '@/types/event'

const MOCK_EVENTS: Event[] = [
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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Event[] | { message: string }>
) {
  if (req.method === 'GET') {
    res.status(200).json(MOCK_EVENTS)
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: 'Method not allowed' })
  }
}
