# MovieDB - A Modern Movie Database Website

A beautiful, responsive movie database website built with Next.js 14, TypeScript, and Tailwind CSS. Inspired by themoviedb.org, this application provides a comprehensive platform for discovering movies, TV shows, and people in the entertainment industry.

## ✨ Features

### 🎬 Core Functionality
- **Movie Discovery**: Browse popular, trending, and top-rated movies
- **TV Show Exploration**: Discover popular TV series and shows
- **People Database**: Find actors, directors, and crew members
- **Advanced Search**: Search across movies, TV shows, and people
- **Detailed Pages**: Rich detail pages with cast, crew, reviews, and more

### 🎨 Modern UI/UX
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Dark Mode**: Beautiful dark theme by default
- **Smooth Animations**: Hover effects and transitions
- **Modern Components**: Card-based layouts with image optimization
- **Accessibility**: ARIA-compliant and keyboard navigable

### 🚀 Technical Features
- **Next.js 14**: Latest App Router with Server Components
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling with custom design system
- **Image Optimization**: Next.js Image component with TMDB integration
- **SEO Optimized**: Meta tags and structured data
- **Performance**: Static generation and optimized builds

## 🏗️ Architecture

The application follows a modern Next.js architecture:

```
apps/web/
├── app/                    # App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── movies/            # Movies section
│   ├── tv/                # TV shows section
│   ├── people/            # People section
│   ├── search/            # Search functionality
│   └── [lang]/            # Legacy routes (redirects)
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── MovieCard.tsx      # Movie display card
│   ├── PersonCard.tsx     # Person display card
│   ├── MovieSlider.tsx    # Horizontal movie slider
│   ├── MovieGrid.tsx      # Movie grid layout
│   ├── HeroSection.tsx    # Homepage hero
│   └── LoadingSpinner.tsx # Loading component
├── lib/                   # Utilities
│   └── api.ts            # API client
└── public/               # Static assets
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue tones (#0ea5e9 to #0c4a6e)
- **Dark**: Slate grays (#f8fafc to #0f172a)
- **Semantic**: Success, warning, error colors

### Typography
- **Font**: Inter (Google Fonts)
- **Scale**: Responsive typography with Tailwind classes

### Components
- **Cards**: Rounded corners with shadows and hover effects
- **Buttons**: Primary and secondary variants
- **Forms**: Consistent input styling with focus states
- **Navigation**: Sticky header with mobile-responsive menu

## 📱 Pages

### Homepage (`/`)
- Hero section with search
- Popular movies slider
- Trending content
- Top-rated movies

### Movies (`/movies`)
- Grid layout of popular movies
- Sorting and filtering options
- Pagination support

### Movie Detail (`/movie/[id]`)
- Full movie information
- Cast and crew
- Reviews and ratings
- Related movies

### TV Shows (`/tv`)
- Popular TV shows grid
- Show information and ratings

### People (`/people`)
- Popular actors and directors
- Person profiles with filmography

### Person Detail (`/person/[id]`)
- Biography and personal info
- Known for section
- Complete filmography

### Search (`/search`)
- Multi-category search results
- Movies, TV shows, and people
- Real-time search functionality

### More (`/more`)
- Category exploration
- Quick links
- Site statistics

## 🔧 Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
cd apps/web
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 🌐 API Integration

The application is designed to work with the existing Laravel API backend:

- **Movies**: `/api/movie/{id}`, `/api/movies/popular`
- **People**: `/api/person/{id}`, `/api/people/popular`
- **Search**: `/api/search?q={query}`

Mock data is used for demonstration when the API is not available.

## 📦 Dependencies

### Core
- **Next.js 14.2.5**: React framework
- **React 18.3.1**: UI library
- **TypeScript 5.2.2**: Type safety

### Styling
- **Tailwind CSS 3.3.0**: Utility-first CSS
- **Heroicons**: Icon library
- **Lucide React**: Additional icons

### Utilities
- **date-fns**: Date formatting
- **clsx**: Conditional classes

## 🚀 Deployment

The application is optimized for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Docker** (Dockerfile included)
- **Static hosting** (with `next export`)

## 🎯 Future Enhancements

- [ ] User authentication and profiles
- [ ] Watchlist functionality
- [ ] Movie ratings and reviews
- [ ] Advanced filtering (genre, year, rating)
- [ ] Infinite scroll pagination
- [ ] PWA features
- [ ] Multi-language support
- [ ] Real-time notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Icons by [Heroicons](https://heroicons.com/)
- Fonts by [Google Fonts](https://fonts.google.com/)