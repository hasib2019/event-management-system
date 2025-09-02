import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { useEvents } from '@/context/EventContext';

export default function EventDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { getEventById, toggleRSVP } = useEvents();
  
  const event = id ? getEventById(id as string) : null;
  const currentUserId = 'user-123'; // Simulated user ID

  if (!event) {
    return (
      <Layout title="Event Not Found">
        <div className="max-w-4xl mx-auto text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-8">The event you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Back to Events
          </Link>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Conference':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Workshop':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Meetup':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const isRSVPed = event.rsvpUsers?.includes(currentUserId) || false;

  const handleRSVP = () => {
    toggleRSVP(event.id, currentUserId);
  };

  return (
    <Layout title={`${event.title} - Event Details`}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Events
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex flex-wrap items-start justify-between mb-6">
              <div className="flex-1 min-w-0 mr-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h1>
                <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${getCategoryColor(event.category)}`}>
                  {event.category}
                </span>
              </div>
              
              <div className="flex-shrink-0 mt-4 sm:mt-0">
                <button
                  onClick={handleRSVP}
                  className={`px-6 py-3 rounded-md font-medium transition-colors ${
                    isRSVPed
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isRSVPed ? 'RSVP&apos;d ✓' : 'RSVP Now'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">Date</p>
                    <p>{formatDate(event.date)}</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p>{event.location}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">Attendees</p>
                    <p>{event.rsvpCount || 0} people attending</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">Category</p>
                    <p>{event.category}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">About this event</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {event.description}
                </p>
              </div>
            </div>

            {event.rsvpCount && event.rsvpCount > 0 && (
              <div className="border-t pt-8 mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Who&apos;s attending ({event.rsvpCount})
                </h3>
                <p className="text-gray-600">
                  Join {event.rsvpCount} other{event.rsvpCount !== 1 ? 's' : ''} who will be attending this event!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
