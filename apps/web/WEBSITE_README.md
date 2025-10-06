# MovieDB Website

A beautiful, modern movie database website built with Next.js 14, similar to themoviedb.org. This website provides a comprehensive interface for browsing movies, TV shows, and people in the entertainment industry.

## 🎬 Features

### Home Page
- **Hero Section** with search functionality
- **Popular Movies** carousel
- **Top Rated Movies** section
- **Upcoming Movies** preview
- Responsive design that works on all devices

### Movie Pages
- **Detailed Movie Pages** with:
  - High-resolution backdrop and poster images
  - Movie information (release date, runtime, rating, genres)
  - Plot overview and tagline
  - Cast and crew with profile images
  - Embedded trailers and videos
  - Budget and revenue information
  - Keywords and metadata
  
### Person Pages
- **Comprehensive Person Profiles** including:
  - Biography and personal information
  - Birth date, place of birth, and other details
  - Complete filmography with release dates
  - Known for section with top movies
  - Profile images

### TV Show Pages
- **TV Show Details** with:
  - Show information and overview
  - Season and episode details
  - Cast information
  - Network and air date information
  
### Search Functionality
- **Advanced Search** across:
  - Movies
  - TV Shows
  - People
- Beautiful card-based results layout
- Real-time search with instant results

### Navigation
- **Header** with:
  - Logo and branding
  - Navigation menu (Movies, TV Shows, People)
  - Integrated search bar
  - Mobile-responsive menu
  
- **Footer** with:
  - Quick links
  - Browse categories
  - Social media links
  - Site information

## 🎨 Design

The website features a modern, clean design inspired by themoviedb.org with:
- **Color Scheme**:
  - Primary: #01b4e4 (TMDB Blue)
  - Secondary: #90cea1 (TMDB Green)
  - Dark: #032541 (TMDB Navy)
  
- **Responsive Layout**: Works beautifully on desktop, tablet, and mobile
- **Smooth Animations**: Card hover effects and transitions
- **Modern UI Components**: Cards, badges, modals
- **Tailwind CSS**: Utility-first CSS framework

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend API running (see main README)

### Installation

1. Navigate to the web app directory:
```bash
cd apps/web
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.local.example .env.local
```

4. Update `.env.local` with your API endpoint:
```env
NEXT_PUBLIC_API_BASE=http://localhost:8080
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Production Build

To create an optimized production build:

```bash
npm run build
npm start
```

## 📁 Project Structure

```
apps/web/
├── app/                      # Next.js 14 App Router
│   ├── [lang]/              # Language-specific routes
│   │   ├── movie/           # Movie pages
│   │   │   ├── [id]/        # Individual movie detail
│   │   │   └── page.tsx     # Movies listing
│   │   ├── tv/              # TV show pages
│   │   │   ├── [id]/        # Individual show detail
│   │   │   └── page.tsx     # TV shows listing
│   │   ├── person/          # Person pages
│   │   │   ├── [id]/        # Individual person detail
│   │   │   └── page.tsx     # People listing
│   │   ├── search/          # Search functionality
│   │   │   └── page.tsx     # Search results
│   │   ├── layout.tsx       # Language layout with header/footer
│   │   └── page.tsx         # Home page
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Root redirect
├── components/              # Reusable React components
│   ├── Header.tsx           # Navigation header
│   ├── Footer.tsx           # Site footer
│   ├── HeroSection.tsx      # Homepage hero
│   ├── MovieCard.tsx        # Movie card component
│   ├── TVCard.tsx           # TV show card
│   ├── PersonCard.tsx       # Person card
│   └── MovieSection.tsx     # Movie carousel section
├── lib/                     # Utility functions
│   └── api.ts               # API client
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── package.json             # Dependencies

```

## 🔧 Configuration

### API Integration

The website communicates with the backend API through the `api.ts` utility:

```typescript
// lib/api.ts
export async function api<T>(path: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080";
  const res = await fetch(`${base}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("API error");
  return (await res.json()) as T;
}
```

### Supported Languages

The website supports multiple languages through the `[lang]` dynamic route:
- English (`/en`)
- Hungarian (`/hu`)
- German (`/de`)

Add more languages by creating appropriate route parameters and translations.

## 🎯 Key Components

### MovieCard
Displays a movie poster with title, year, and rating badge.

### Header
Responsive navigation with search bar and mobile menu.

### Footer
Site-wide footer with links and information.

### HeroSection
Homepage hero with large search bar and call-to-action.

## 🌐 API Endpoints Used

- `GET /api/search?q={query}` - Search movies, TV shows, people
- `GET /api/movie/{id}` - Get movie details
- `GET /api/tv/{id}` - Get TV show details
- `GET /api/person/{id}` - Get person details

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#01b4e4',
      secondary: '#90cea1',
      dark: '#032541',
    },
  },
}
```

### Styling

Global styles are in `app/globals.css`. Use Tailwind utility classes for component styling.

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Set environment variables
4. Deploy

### Docker

The project includes a Dockerfile for containerized deployment:

```bash
docker build -t moviedb-web .
docker run -p 3000:3000 moviedb-web
```

## 🐛 Troubleshooting

### Images not loading
- Ensure TMDB image domains are whitelisted in `next.config.js`
- Check network connectivity to image.tmdb.org

### API errors
- Verify the API backend is running
- Check `NEXT_PUBLIC_API_BASE` environment variable
- Ensure API endpoints return expected data format

### Build errors
- Clear `.next` directory and rebuild
- Ensure all dependencies are installed
- Check Node.js version (18+ required)

## 📝 License

This project is part of the TMDB Full Scraper system. See the main README for license information.

## 🙏 Acknowledgments

- Design inspired by [themoviedb.org](https://www.themoviedb.org)
- Movie data provided by TMDB API
- Built with Next.js, React, and Tailwind CSS
