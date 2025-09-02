# Event Management System

A comprehensive event management system built with Next.js, TypeScript, and Tailwind CSS. This application allows users to create, view, search, and manage events with a modern, responsive interface.

## Features

### Core Features
- **Event Listing**: View all upcoming events with search and category filters
- **Event Details**: Detailed view of individual events with RSVP functionality
- **Create Events**: Form-based event creation with validation
- **My Events**: Personal dashboard to manage created events
- **Event Management**: Edit and delete events you've created

### Bonus Features
- **RSVP System**: Track event attendance with RSVP functionality
- **Event Editing**: Update event details after creation
- **Responsive Design**: Mobile-friendly interface
- **Local Storage**: Persistent data storage in browser
- **Category Filtering**: Filter events by Conference, Workshop, or Meetup
- **Search Functionality**: Search events by title

## Tech Stack

- **Framework**: Next.js 15 (Pages Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Data Persistence**: Local Storage
- **Icons**: Heroicons (SVG)

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── EventCard.tsx    # Event display card
│   ├── Header.tsx       # Navigation header
│   ├── Layout.tsx       # Page layout wrapper
│   └── SearchFilter.tsx # Search and filter component
├── context/             # React Context for state management
│   └── EventContext.tsx # Event state management
├── pages/              # Next.js pages
│   ├── api/            # API routes
│   │   └── events.ts   # Mock events API
│   ├── events/         # Dynamic event routes
│   │   └── [id].tsx    # Event details page
│   ├── edit-event/     # Edit event routes
│   │   └── [id].tsx    # Edit event page
│   ├── _app.tsx        # App wrapper with providers
│   ├── create-event.tsx # Create event page
│   ├── index.tsx       # Home page (event listing)
│   └── my-events.tsx   # User's events page
├── styles/             # Global styles
│   └── globals.css     # Tailwind and custom CSS
└── types/              # TypeScript type definitions
    └── event.ts        # Event-related types
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd event-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Usage

### Creating Events
1. Navigate to "Create Event" in the header
2. Fill in the event details:
   - Title (required)
   - Category (Conference, Workshop, Meetup)
   - Date (required, must be future date)
   - Location (required)
   - Description (required)
3. Submit the form to create the event

### Managing Events
1. Go to "My Events" to see events you've created
2. Use "Edit" to modify event details
3. Use "Delete" to remove events (with confirmation)

### Discovering Events
1. Browse all events on the home page
2. Use the search bar to find events by title
3. Filter by category using the dropdown
4. Click "View Details" to see full event information
5. Use "RSVP" to indicate attendance

## API Routes

- `GET /api/events` - Returns mock event data

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `.next` folder and `package.json` to your hosting provider

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.
