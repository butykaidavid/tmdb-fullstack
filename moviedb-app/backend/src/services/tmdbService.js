const axios = require('axios');

class TMDBService {
  constructor() {
    this.apiKey = process.env.TMDB_API_KEY;
    this.baseURL = process.env.TMDB_BASE_URL;
    this.imageBaseURL = process.env.TMDB_IMAGE_BASE_URL;
    
    this.client = axios.create({
      baseURL: this.baseURL,
      params: {
        api_key: this.apiKey
      }
    });
  }

  // Movie endpoints
  async getTrending(mediaType = 'all', timeWindow = 'week', page = 1) {
    const response = await this.client.get(`/trending/${mediaType}/${timeWindow}`, {
      params: { page }
    });
    return response.data;
  }

  async getPopularMovies(page = 1) {
    const response = await this.client.get('/movie/popular', {
      params: { page }
    });
    return response.data;
  }

  async getTopRatedMovies(page = 1) {
    const response = await this.client.get('/movie/top_rated', {
      params: { page }
    });
    return response.data;
  }

  async getUpcomingMovies(page = 1) {
    const response = await this.client.get('/movie/upcoming', {
      params: { page }
    });
    return response.data;
  }

  async getNowPlayingMovies(page = 1) {
    const response = await this.client.get('/movie/now_playing', {
      params: { page }
    });
    return response.data;
  }

  async getMovieDetails(movieId) {
    const response = await this.client.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'credits,videos,images,similar,recommendations,reviews'
      }
    });
    return response.data;
  }

  // TV Show endpoints
  async getPopularTVShows(page = 1) {
    const response = await this.client.get('/tv/popular', {
      params: { page }
    });
    return response.data;
  }

  async getTopRatedTVShows(page = 1) {
    const response = await this.client.get('/tv/top_rated', {
      params: { page }
    });
    return response.data;
  }

  async getOnTheAirTVShows(page = 1) {
    const response = await this.client.get('/tv/on_the_air', {
      params: { page }
    });
    return response.data;
  }

  async getAiringTodayTVShows(page = 1) {
    const response = await this.client.get('/tv/airing_today', {
      params: { page }
    });
    return response.data;
  }

  async getTVShowDetails(tvId) {
    const response = await this.client.get(`/tv/${tvId}`, {
      params: {
        append_to_response: 'credits,videos,images,similar,recommendations,reviews,seasons'
      }
    });
    return response.data;
  }

  // Search endpoints
  async searchMulti(query, page = 1) {
    const response = await this.client.get('/search/multi', {
      params: { query, page }
    });
    return response.data;
  }

  async searchMovies(query, page = 1, filters = {}) {
    const response = await this.client.get('/search/movie', {
      params: { query, page, ...filters }
    });
    return response.data;
  }

  async searchTVShows(query, page = 1) {
    const response = await this.client.get('/search/tv', {
      params: { query, page }
    });
    return response.data;
  }

  async searchPeople(query, page = 1) {
    const response = await this.client.get('/search/person', {
      params: { query, page }
    });
    return response.data;
  }

  // Discover endpoints
  async discoverMovies(filters = {}) {
    const response = await this.client.get('/discover/movie', {
      params: filters
    });
    return response.data;
  }

  async discoverTVShows(filters = {}) {
    const response = await this.client.get('/discover/tv', {
      params: filters
    });
    return response.data;
  }

  // Genre endpoints
  async getMovieGenres() {
    const response = await this.client.get('/genre/movie/list');
    return response.data;
  }

  async getTVGenres() {
    const response = await this.client.get('/genre/tv/list');
    return response.data;
  }

  // Person endpoints
  async getPersonDetails(personId) {
    const response = await this.client.get(`/person/${personId}`, {
      params: {
        append_to_response: 'movie_credits,tv_credits,images'
      }
    });
    return response.data;
  }

  async getPopularPeople(page = 1) {
    const response = await this.client.get('/person/popular', {
      params: { page }
    });
    return response.data;
  }

  // Helper method to build image URLs
  getImageUrl(path, size = 'original') {
    if (!path) return null;
    return `${this.imageBaseURL}${size}${path}`;
  }
}

module.exports = new TMDBService();