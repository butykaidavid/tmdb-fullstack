<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IngestController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\HealthController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\PersonController;

Route::get('/health', HealthController::class);
Route::get('/search', [SearchController::class,'__invoke']);

Route::get('/movie/{id}', [MovieController::class, 'show']);
Route::get('/person/{id}', [PersonController::class, 'show']);
Route::get('/movies/popular', [MovieController::class, 'popular']);

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
