<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Movie;
use App\Models\MovieCredit;

class MovieController extends Controller
{
    public function trending(Request $request)
    {
        $limit = $request->query('limit', 20);
        $movies = Movie::query()
            ->whereNotNull('poster_path')
            ->orderBy('popularity', 'desc')
            ->limit($limit)
            ->get(['id', 'tmdb_id', 'title', 'poster_path', 'release_date', 'vote_average', 'vote_count']);
        
        return response()->json($movies);
    }

    public function popular(Request $request)
    {
        $limit = $request->query('limit', 20);
        $movies = Movie::query()
            ->whereNotNull('poster_path')
            ->where('vote_count', '>', 100)
            ->orderBy('popularity', 'desc')
            ->limit($limit)
            ->get(['id', 'tmdb_id', 'title', 'poster_path', 'release_date', 'vote_average', 'vote_count']);
        
        return response()->json($movies);
    }

    public function topRated(Request $request)
    {
        $limit = $request->query('limit', 20);
        $movies = Movie::query()
            ->whereNotNull('poster_path')
            ->where('vote_count', '>', 1000)
            ->orderBy('vote_average', 'desc')
            ->limit($limit)
            ->get(['id', 'tmdb_id', 'title', 'poster_path', 'release_date', 'vote_average', 'vote_count']);
        
        return response()->json($movies);
    }

    public function nowPlaying(Request $request)
    {
        $limit = $request->query('limit', 20);
        $movies = Movie::query()
            ->whereNotNull('poster_path')
            ->where('release_date', '>=', now()->subMonths(2))
            ->where('release_date', '<=', now())
            ->orderBy('release_date', 'desc')
            ->limit($limit)
            ->get(['id', 'tmdb_id', 'title', 'poster_path', 'release_date', 'vote_average', 'vote_count']);
        
        return response()->json($movies);
    }

    public function upcoming(Request $request)
    {
        $limit = $request->query('limit', 20);
        $movies = Movie::query()
            ->whereNotNull('poster_path')
            ->where('release_date', '>', now())
            ->orderBy('release_date', 'asc')
            ->limit($limit)
            ->get(['id', 'tmdb_id', 'title', 'poster_path', 'release_date', 'vote_average', 'vote_count']);
        
        return response()->json($movies);
    }

    public function show($id)
    {
        $movie = Movie::where('tmdb_id', $id)->first();
        
        if (!$movie) {
            return response()->json(['error' => 'Movie not found'], 404);
        }

        return response()->json($movie);
    }

    public function credits($id)
    {
        $movie = Movie::where('tmdb_id', $id)->first();
        
        if (!$movie) {
            return response()->json(['error' => 'Movie not found'], 404);
        }

        $credits = MovieCredit::where('movie_id', $movie->id)
            ->with('person')
            ->get();

        $cast = $credits->where('department', 'Acting')->take(20);
        $crew = $credits->where('department', '!=', 'Acting')->take(10);

        return response()->json([
            'cast' => $cast,
            'crew' => $crew
        ]);
    }

    public function similar($id)
    {
        $movie = Movie::where('tmdb_id', $id)->first();
        
        if (!$movie) {
            return response()->json(['error' => 'Movie not found'], 404);
        }

        $similar = Movie::query()
            ->where('id', '!=', $movie->id)
            ->whereNotNull('poster_path')
            ->where(function($query) use ($movie) {
                if ($movie->genres) {
                    foreach ($movie->genres as $genre) {
                        $query->orWhereJsonContains('genres', $genre);
                    }
                }
            })
            ->orderBy('vote_average', 'desc')
            ->limit(20)
            ->get(['id', 'tmdb_id', 'title', 'poster_path', 'release_date', 'vote_average', 'vote_count']);

        return response()->json($similar);
    }

    public function recommendations($id)
    {
        return $this->similar($id);
    }
}