import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import MovieSlider from '@/components/MovieSlider'
import { api } from '@/lib/api'

async function getPopularMovies() {
  try {
    // For now, we'll use mock data since the API structure might be different
    // In a real implementation, you'd call your actual API
    return []
  } catch (error) {
    console.error('Error fetching popular movies:', error)
    return []
  }
}

async function getTrendingMovies() {
  try {
    return []
  } catch (error) {
    console.error('Error fetching trending movies:', error)
    return []
  }
}

export default async function Home() {
  const [popularMovies, trendingMovies] = await Promise.all([
    getPopularMovies(),
    getTrendingMovies()
  ])

  // Mock data for demonstration
  const mockMovies = [
    {
      id: 1,
      title: "The Shawshank Redemption",
      poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
      vote_average: 9.3,
      release_date: "1994-09-23",
      overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
    },
    {
      id: 2,
      title: "The Godfather",
      poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      vote_average: 9.2,
      release_date: "1972-03-14",
      overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son."
    },
    {
      id: 3,
      title: "The Dark Knight",
      poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      vote_average: 9.0,
      release_date: "2008-07-16",
      overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests."
    },
    {
      id: 4,
      title: "Pulp Fiction",
      poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
      vote_average: 8.9,
      release_date: "1994-09-10",
      overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
    },
    {
      id: 5,
      title: "Forrest Gump",
      poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      vote_average: 8.8,
      release_date: "1994-06-23",
      overview: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold from the perspective of an Alabama man."
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <MovieSlider 
            movies={mockMovies} 
            title="Popular Movies" 
          />
          
          <MovieSlider 
            movies={mockMovies.slice().reverse()} 
            title="Trending This Week" 
          />
          
          <MovieSlider 
            movies={mockMovies.slice(1, 4)} 
            title="Top Rated" 
          />
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
