# Event Management System

A modern, responsive Event Management System built with Next.js, TypeScript, and Tailwind CSS. This application allows users to view, create, filter, and manage events with full CRUD functionality.

## 🚀 Features

### Core Features
- **View Events**: Browse all upcoming events with detailed information
- **Create Events**: Add new events with title, description, date, location, and category
- **Filter & Search**: Filter events by category and search by title
- **Event Details**: View comprehensive event information on dedicated pages
- **My Events**: Manage your created events with edit and delete functionality
- **RSVP System**: Track event attendance with RSVP functionality

### Bonus Features
- **Edit Events**: Modify existing event details
- **Event Statistics**: View total events, upcoming events, and RSVP counts
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **LocalStorage Persistence**: Data persists across browser sessions
- **Modern UI**: Clean, intuitive interface with Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.2 (Pages Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **State Management**: React Context API
- **Data Persistence**: LocalStorage
- **Icons**: Heroicons (SVG)
- **Font**: Geist Sans

## 📦 Project Structure

```
event-management-system/
├── src/
│   ├── components/
│   │   ├── EventCard.tsx        # Event display component
│   │   ├── Header.tsx           # Navigation header
│   │   ├── Layout.tsx           # Main layout wrapper
│   │   └── SearchFilter.tsx     # Search and filter component
│   ├── context/
│   │   └── EventContext.tsx     # Global state management
│   ├── pages/
│   │   ├── api/
│   │   │   ├── events.ts        # Mock API endpoints
│   │   │   └── hello.ts         # Default API route
│   │   ├── edit-event/
│   │   │   └── [id].tsx         # Edit event page
│   │   ├── events/
│   │   │   └── [id].tsx         # Event details page
│   │   ├── _app.tsx             # App wrapper with providers
│   │   ├── _document.tsx        # HTML document structure
│   │   ├── create-event.tsx     # Create event form
│   │   ├── index.tsx            # Home page (event listing)
│   │   └── my-events.tsx        # User's events management
│   ├── styles/
│   │   └── globals.css          # Global styles and utilities
│   └── types/
│       └── event.ts             # TypeScript type definitions
├── public/                      # Static assets
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd event-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm run start
```

## 📱 Usage

### Navigation
- **Home**: View and search all upcoming events
- **Create Event**: Add new events to the system
- **My Events**: Manage your created events

### Creating Events
1. Click "Create Event" in navigation
2. Fill in event details (title, description, date, location, category)
3. Submit to add to your events list

### Managing Events
- **View Details**: Click "View Details" on any event card
- **RSVP**: Click RSVP button to attend events
- **Edit**: Go to "My Events" and click "Edit" on your events
- **Delete**: Remove events from "My Events" page

### Filtering Events
- Use the search bar to find events by title
- Filter by category (Conference, Workshop, Meetup, Networking, Other)
- Clear filters by clicking the × button on filter tags

## 🔧 API Routes

The application includes mock API routes:

### GET `/api/events`
Returns all events

### POST `/api/events`
Creates a new event

```json
{
  "title": "Event Title",
  "description": "Event Description",
  "date": "2025-12-31T18:00:00",
  "location": "Event Location",
  "category": "Conference"
}
```

## 🎨 Design Features

- **Responsive Grid Layout**: Adapts to different screen sizes
- **Modern Card Design**: Clean event cards with hover effects
- **Interactive Components**: Buttons with loading states and transitions
- **Form Validation**: Real-time validation with error messages
- **Modal Dialogs**: Confirmation dialogs for destructive actions
- **Status Indicators**: Visual feedback for event states

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js and deploy

### Deploy to Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🧪 Development

### Adding New Features
1. Create components in `src/components/`
2. Add pages in `src/pages/`
3. Update types in `src/types/event.ts`
4. Extend context in `src/context/EventContext.tsx`

### State Management
The app uses React Context for state management:
- Events are stored in localStorage
- Context provides CRUD operations
- Components subscribe to context updates

### Styling
- Tailwind CSS for utility-first styling
- Custom CSS classes in `globals.css`
- Responsive design with mobile-first approach

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🎯 Future Enhancements

- User authentication and authorization
- Real database integration (MongoDB, PostgreSQL)
- Email notifications for events
- Calendar integration
- Event images and media upload
- Advanced filtering and sorting options
- Event categories management
- User profiles and preferences
