import axios from 'axios';

const API_BASE_URL = '/api';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Image URL helpers
export const getImageUrl = (path, size = 'original') => {
  if (!path) return '/placeholder.jpg';
  return `${IMAGE_BASE_URL}${size}${path}`;
};

export const IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    original: 'original',
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original',
  },
  profile: {
    small: 'w45',
    medium: 'w185',
    large: 'h632',
    original: 'original',
  },
};

// Movie endpoints
export const movieApi = {
  getTrending: (timeWindow = 'week', page = 1) =>
    api.get(`/movies/trending`, { params: { timeWindow, page } }),
  getPopular: (page = 1) =>
    api.get('/movies/popular', { params: { page } }),
  getTopRated: (page = 1) =>
    api.get('/movies/top-rated', { params: { page } }),
  getUpcoming: (page = 1) =>
    api.get('/movies/upcoming', { params: { page } }),
  getNowPlaying: (page = 1) =>
    api.get('/movies/now-playing', { params: { page } }),
  getDetails: (id) =>
    api.get(`/movies/${id}`),
  getSimilar: (id, page = 1) =>
    api.get(`/movies/${id}/similar`, { params: { page } }),
  getRecommendations: (id, page = 1) =>
    api.get(`/movies/${id}/recommendations`, { params: { page } }),
  getCredits: (id) =>
    api.get(`/movies/${id}/credits`),
  getVideos: (id) =>
    api.get(`/movies/${id}/videos`),
  getReviews: (id, page = 1) =>
    api.get(`/movies/${id}/reviews`, { params: { page } }),
  discover: (filters) =>
    api.get('/movies/discover/filter', { params: filters }),
};

// TV Show endpoints
export const tvApi = {
  getPopular: (page = 1) =>
    api.get('/tv/popular', { params: { page } }),
  getTopRated: (page = 1) =>
    api.get('/tv/top-rated', { params: { page } }),
  getOnTheAir: (page = 1) =>
    api.get('/tv/on-the-air', { params: { page } }),
  getAiringToday: (page = 1) =>
    api.get('/tv/airing-today', { params: { page } }),
  getDetails: (id) =>
    api.get(`/tv/${id}`),
  getSimilar: (id, page = 1) =>
    api.get(`/tv/${id}/similar`, { params: { page } }),
  getRecommendations: (id, page = 1) =>
    api.get(`/tv/${id}/recommendations`, { params: { page } }),
  getCredits: (id) =>
    api.get(`/tv/${id}/credits`),
  getVideos: (id) =>
    api.get(`/tv/${id}/videos`),
  getReviews: (id, page = 1) =>
    api.get(`/tv/${id}/reviews`, { params: { page } }),
  getSeasonDetails: (id, seasonNumber) =>
    api.get(`/tv/${id}/season/${seasonNumber}`),
  discover: (filters) =>
    api.get('/tv/discover/filter', { params: filters }),
};

// Search endpoints
export const searchApi = {
  multi: (query, page = 1) =>
    api.get('/search/multi', { params: { query, page } }),
  movies: (query, page = 1, filters = {}) =>
    api.get('/search/movies', { params: { query, page, ...filters } }),
  tv: (query, page = 1) =>
    api.get('/search/tv', { params: { query, page } }),
  people: (query, page = 1) =>
    api.get('/search/people', { params: { query, page } }),
};

// Genre endpoints
export const genreApi = {
  getMovieGenres: () =>
    api.get('/genres/movies'),
  getTVGenres: () =>
    api.get('/genres/tv'),
  getAllGenres: () =>
    api.get('/genres/all'),
};

// Person endpoints
export const personApi = {
  getPopular: (page = 1) =>
    api.get('/person/popular', { params: { page } }),
  getDetails: (id) =>
    api.get(`/person/${id}`),
};

export default api;