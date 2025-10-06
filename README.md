# MovieDB - A Modern Movie Database Website

A full-featured movie database website inspired by themoviedb.org, built with modern web technologies and featuring a beautiful, responsive design.

## 🎬 Features

### 🏠 Homepage
- **Hero Section**: Featured movie with backdrop image and key information
- **Trending Movies**: Real-time trending movie carousel
- **Popular Movies**: Most popular films based on user ratings
- **Top Rated Movies**: Highest-rated movies of all time
- **Now Playing**: Currently playing in theaters
- **Upcoming Movies**: Soon-to-be-released films

### 🎭 Movie Details
- **Comprehensive Information**: Plot, cast, crew, ratings, release date, runtime
- **Cast & Crew**: Detailed cast information with character names
- **Similar Movies**: Recommendations based on genre and ratings
- **Movie Facts**: Budget, revenue, production companies, genres
- **High-Quality Images**: Posters and backdrop images from TMDB

### 👥 People Pages
- **Actor Profiles**: Detailed actor/actress information
- **Filmography**: Complete list of movies and TV shows
- **Personal Information**: Birth date, place of birth, biography
- **High-Quality Photos**: Profile images and gallery

### 📺 TV Shows
- **TV Show Listings**: Trending, popular, and top-rated shows
- **Show Details**: Episodes, seasons, cast, and crew
- **Similar Shows**: Recommendations based on genre
- **Network Information**: Broadcasting networks and creators

### 🔍 Search Functionality
- **Universal Search**: Search across movies, TV shows, and people
- **Real-time Results**: Instant search results as you type
- **Filtered Results**: Separate sections for movies and people
- **No Results Handling**: User-friendly empty state

### 📱 Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Touch-Friendly**: Easy navigation on mobile devices
- **Fast Loading**: Optimized images and lazy loading
- **Modern UI**: Clean, intuitive interface

## 🛠️ Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Next/Image**: Optimized image loading

### Backend
- **Laravel 11**: PHP framework for API
- **PostgreSQL**: Primary database
- **Redis**: Caching and session storage
- **OpenSearch**: Full-text search engine

### Infrastructure
- **Docker**: Containerized deployment
- **Docker Compose**: Multi-service orchestration
- **Nginx**: Web server and reverse proxy

## 🚀 Getting Started

### Prerequisites
- Docker Desktop
- TMDB API Key (v4 token)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd movie-database
   ```

2. **Set up environment variables**
   ```bash
   # Copy environment files
   cp apps/api/.env.example apps/api/.env
   cp apps/etl/.env.example apps/etl/.env
   cp apps/web/.env.example apps/web/.env
   ```

3. **Configure TMDB API Key**
   Edit `apps/etl/.env` and add your TMDB API key:
   ```env
   TMDB_BEARER=your_tmdb_api_key_here
   ```

4. **Start the application**
   ```bash
   docker-compose up -d
   ```

5. **Run database migrations**
   ```bash
   docker-compose exec api php artisan migrate
   ```

6. **Ingest initial data** (optional)
   ```bash
   docker-compose exec etl python -m etl.cli ingest --movies --people --tv
   ```

### Access the Application

- **Web Application**: http://localhost:3000
- **API**: http://localhost:8080
- **Database**: localhost:5432
- **OpenSearch**: http://localhost:9200

## 📁 Project Structure

```
movie-database/
├── apps/
│   ├── api/                 # Laravel API backend
│   │   ├── app/
│   │   │   ├── Http/Controllers/
│   │   │   └── Models/
│   │   ├── database/migrations/
│   │   └── routes/
│   ├── etl/                 # Python ETL pipeline
│   │   └── src/etl/
│   └── web/                 # Next.js frontend
│       ├── app/
│       ├── components/
│       └── lib/
├── opensearch/              # Search index configurations
└── docker-compose.yml
```

## 🎨 Design Features

### Color Scheme
- **Primary**: TMDB-inspired dark theme
- **Accent**: Red (#e50914) for highlights
- **Background**: Dark blue (#0f0f23)
- **Text**: White and light gray for readability

### Typography
- **Font**: Inter (Google Fonts)
- **Hierarchy**: Clear heading and body text sizes
- **Readability**: Optimized line heights and spacing

### Components
- **Navigation**: Sticky header with mobile menu
- **Cards**: Hover effects and smooth transitions
- **Buttons**: Consistent styling with hover states
- **Forms**: Accessible input fields with focus states

## 🔧 API Endpoints

### Movies
- `GET /api/movies/trending` - Trending movies
- `GET /api/movies/popular` - Popular movies
- `GET /api/movies/top-rated` - Top rated movies
- `GET /api/movies/now-playing` - Now playing movies
- `GET /api/movies/upcoming` - Upcoming movies
- `GET /api/movie/{id}` - Movie details
- `GET /api/movie/{id}/credits` - Movie cast and crew
- `GET /api/movie/{id}/similar` - Similar movies

### People
- `GET /api/people/popular` - Popular people
- `GET /api/person/{id}` - Person details
- `GET /api/person/{id}/movie_credits` - Person's movie credits
- `GET /api/person/{id}/tv_credits` - Person's TV credits

### TV Shows
- `GET /api/tv/trending` - Trending TV shows
- `GET /api/tv/popular` - Popular TV shows
- `GET /api/tv/top-rated` - Top rated TV shows
- `GET /api/tv/{id}` - TV show details
- `GET /api/tv/{id}/credits` - TV show cast and crew
- `GET /api/tv/{id}/similar` - Similar TV shows

### Search
- `GET /api/search?q={query}` - Universal search

## 🚀 Deployment

### Production Deployment

1. **Set up production environment variables**
2. **Configure domain and SSL certificates**
3. **Set up database backups**
4. **Configure monitoring and logging**
5. **Deploy using Docker Swarm or Kubernetes**

### Environment Variables

#### API (.env)
```env
APP_NAME=MovieDB
APP_ENV=production
APP_DEBUG=false
DB_CONNECTION=pgsql
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=tmdb
DB_USERNAME=app
DB_PASSWORD=your_secure_password
```

#### ETL (.env)
```env
TMDB_BEARER=your_tmdb_api_key
DATABASE_URL=postgresql://app:password@postgres:5432/tmdb
REDIS_URL=redis://redis:6379
```

#### Web (.env)
```env
NEXT_PUBLIC_API_BASE=http://localhost:8080
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **The Movie Database (TMDB)** for providing the API and data
- **Laravel** for the robust PHP framework
- **Next.js** for the excellent React framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon set

## 📞 Support

For support, email support@moviedb.com or create an issue in the repository.

---

**MovieDB** - Discover, explore, and enjoy movies and TV shows like never before! 🎬✨