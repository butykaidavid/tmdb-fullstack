<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IngestController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\HealthController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\TvController;

// Health check
Route::get('/health', HealthController::class);

// Search
Route::get('/search', [SearchController::class,'__invoke']);

// Movies
Route::get('/movies/trending', [MovieController::class,'trending']);
Route::get('/movies/popular', [MovieController::class,'popular']);
Route::get('/movies/top-rated', [MovieController::class,'topRated']);
Route::get('/movies/now-playing', [MovieController::class,'nowPlaying']);
Route::get('/movies/upcoming', [MovieController::class,'upcoming']);
Route::get('/movie/{id}', [MovieController::class,'show']);
Route::get('/movie/{id}/credits', [MovieController::class,'credits']);
Route::get('/movie/{id}/similar', [MovieController::class,'similar']);
Route::get('/movie/{id}/recommendations', [MovieController::class,'recommendations']);

// People
Route::get('/people/popular', [PersonController::class,'popular']);
Route::get('/person/{id}', [PersonController::class,'show']);
Route::get('/person/{id}/movie_credits', [PersonController::class,'movieCredits']);
Route::get('/person/{id}/tv_credits', [PersonController::class,'tvCredits']);

// TV Shows
Route::get('/tv/trending', [TvController::class,'trending']);
Route::get('/tv/popular', [TvController::class,'popular']);
Route::get('/tv/top-rated', [TvController::class,'topRated']);
Route::get('/tv/on-the-air', [TvController::class,'onTheAir']);
Route::get('/tv/airing-today', [TvController::class,'airingToday']);
Route::get('/tv/{id}', [TvController::class,'show']);
Route::get('/tv/{id}/credits', [TvController::class,'credits']);
Route::get('/tv/{id}/similar', [TvController::class,'similar']);
Route::get('/tv/{id}/recommendations', [TvController::class,'recommendations']);

// Ingest routes
Route::post('/ingest/movie', [IngestController::class,'movie']);
Route::post('/ingest/person', [IngestController::class,'person']);
Route::post('/ingest/tv', [IngestController::class,'tv']);
Route::post('/ingest/season', [IngestController::class,'season']);
Route::post('/ingest/episode', [IngestController::class,'episode']);
Route::post('/ingest/company', [IngestController::class,'company']);
Route::post('/ingest/network', [IngestController::class,'network']);
Route::post('/ingest/collection', [IngestController::class,'collection']);
Route::post('/ingest/genre', [IngestController::class,'genre']);
Route::post('/ingest/keyword', [IngestController::class,'keyword']);
Route::post('/ingest/providers', [IngestController::class,'providers']);
Route::post('/ingest/release-dates', [IngestController::class,'releaseDates']);
Route::post('/ingest/certifications', [IngestController::class,'certifications']);
