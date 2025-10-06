# MovieDB - A Movie Database Website

A modern, responsive movie database website similar to TheMovieDB.org, built with React, Node.js, and the TMDB API.

## Features

- 🎬 Browse popular, trending, upcoming, and top-rated movies and TV shows
- 🔍 Search for movies, TV shows, and people
- 📖 Detailed pages for movies, TV shows, and people with comprehensive information
- 🎭 Filter content by genres, ratings, and release dates
- 📱 Fully responsive design for all devices
- ♾️ Infinite scroll for seamless browsing
- ⚡ Fast performance with lazy loading and optimized queries
- 🎨 Modern UI with smooth animations and transitions

## Tech Stack

### Frontend
- React 18 with Hooks
- React Router for navigation
- React Query for data fetching and caching
- Tailwind CSS for styling
- Swiper for carousels
- Vite for fast development

### Backend
- Node.js with Express
- TMDB API integration
- Rate limiting and security middleware
- CORS enabled

## Prerequisites

- Node.js 16+ and npm/yarn
- TMDB API key (get it free from [themoviedb.org](https://www.themoviedb.org/settings/api))

## Installation

1. Clone the repository:
```bash
cd moviedb-app
```

2. Install dependencies:
```bash
npm run install:all
```

3. Configure environment variables:
   - Copy `backend/.env.example` to `backend/.env`
   - Add your TMDB API key to the `.env` file:
```env
TMDB_API_KEY=your_actual_api_key_here
```

## Development

Start both frontend and backend in development mode:

```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend dev server on http://localhost:5173

## Production Build

Build the frontend for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Project Structure

```
moviedb-app/
├── backend/
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── routes/        # API routes
│   │   ├── services/      # TMDB API service
│   │   └── index.js       # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API client
│   │   ├── styles/        # Global styles
│   │   └── App.jsx        # Main app component
│   └── package.json
└── package.json           # Root package.json
```

## API Endpoints

### Movies
- `GET /api/movies/trending` - Get trending movies
- `GET /api/movies/popular` - Get popular movies
- `GET /api/movies/top-rated` - Get top-rated movies
- `GET /api/movies/upcoming` - Get upcoming movies
- `GET /api/movies/now-playing` - Get now playing movies
- `GET /api/movies/:id` - Get movie details
- `GET /api/movies/discover/filter` - Discover movies with filters

### TV Shows
- `GET /api/tv/popular` - Get popular TV shows
- `GET /api/tv/top-rated` - Get top-rated TV shows
- `GET /api/tv/on-the-air` - Get TV shows on the air
- `GET /api/tv/airing-today` - Get TV shows airing today
- `GET /api/tv/:id` - Get TV show details
- `GET /api/tv/discover/filter` - Discover TV shows with filters

### Search
- `GET /api/search/multi` - Multi search (movies, TV, people)
- `GET /api/search/movies` - Search movies
- `GET /api/search/tv` - Search TV shows
- `GET /api/search/people` - Search people

### Other
- `GET /api/genres/all` - Get all genres
- `GET /api/person/:id` - Get person details

## Features in Detail

### Homepage
- Hero slider with trending content
- Sections for popular movies, TV shows, top-rated, and upcoming content
- Smooth carousel navigation

### Movie/TV Detail Pages
- High-quality backdrop images
- Comprehensive information (cast, crew, production details)
- Trailers and videos
- Similar and recommended content
- User reviews

### Search & Discovery
- Real-time search with filters
- Advanced discovery with multiple filter options
- Genre-based browsing
- Infinite scroll for results

### Person Pages
- Biography and personal information
- Complete filmography
- Known for section
- Profile images

## Performance Optimizations

- Lazy loading images
- Infinite scroll pagination
- React Query caching
- Optimized bundle with code splitting
- Compressed assets
- Rate limiting on API

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

- Data provided by [The Movie Database (TMDB)](https://www.themoviedb.org)
- Icons from React Icons
- UI inspiration from TheMovieDB.org

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you have any questions or need help, please open an issue in the repository.