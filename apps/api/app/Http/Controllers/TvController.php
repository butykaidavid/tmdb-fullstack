<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\TvShow;

class TvController extends Controller
{
    public function trending(Request $request)
    {
        $limit = $request->query('limit', 20);
        $shows = TvShow::query()
            ->whereNotNull('poster_path')
            ->orderBy('popularity', 'desc')
            ->limit($limit)
            ->get(['id', 'tmdb_id', 'name', 'poster_path', 'first_air_date', 'vote_average', 'vote_count']);
        
        return response()->json($shows);
    }

    public function popular(Request $request)
    {
        $limit = $request->query('limit', 20);
        $shows = TvShow::query()
            ->whereNotNull('poster_path')
            ->where('vote_count', '>', 100)
            ->orderBy('popularity', 'desc')
            ->limit($limit)
            ->get(['id', 'tmdb_id', 'name', 'poster_path', 'first_air_date', 'vote_average', 'vote_count']);
        
        return response()->json($shows);
    }

    public function topRated(Request $request)
    {
        $limit = $request->query('limit', 20);
        $shows = TvShow::query()
            ->whereNotNull('poster_path')
            ->where('vote_count', '>', 1000)
            ->orderBy('vote_average', 'desc')
            ->limit($limit)
            ->get(['id', 'tmdb_id', 'name', 'poster_path', 'first_air_date', 'vote_average', 'vote_count']);
        
        return response()->json($shows);
    }

    public function onTheAir(Request $request)
    {
        $limit = $request->query('limit', 20);
        $shows = TvShow::query()
            ->whereNotNull('poster_path')
            ->where('status', 'Returning Series')
            ->orderBy('last_air_date', 'desc')
            ->limit($limit)
            ->get(['id', 'tmdb_id', 'name', 'poster_path', 'first_air_date', 'vote_average', 'vote_count']);
        
        return response()->json($shows);
    }

    public function airingToday(Request $request)
    {
        $limit = $request->query('limit', 20);
        $shows = TvShow::query()
            ->whereNotNull('poster_path')
            ->where('status', 'Returning Series')
            ->orderBy('last_air_date', 'desc')
            ->limit($limit)
            ->get(['id', 'tmdb_id', 'name', 'poster_path', 'first_air_date', 'vote_average', 'vote_count']);
        
        return response()->json($shows);
    }

    public function show($id)
    {
        $show = TvShow::where('tmdb_id', $id)->first();
        
        if (!$show) {
            return response()->json(['error' => 'TV Show not found'], 404);
        }

        return response()->json($show);
    }

    public function credits($id)
    {
        $show = TvShow::where('tmdb_id', $id)->first();
        
        if (!$show) {
            return response()->json(['error' => 'TV Show not found'], 404);
        }

        // For now, return empty arrays as TV credits would need separate tables
        return response()->json([
            'cast' => [],
            'crew' => []
        ]);
    }

    public function similar($id)
    {
        $show = TvShow::where('tmdb_id', $id)->first();
        
        if (!$show) {
            return response()->json(['error' => 'TV Show not found'], 404);
        }

        $similar = TvShow::query()
            ->where('id', '!=', $show->id)
            ->whereNotNull('poster_path')
            ->where(function($query) use ($show) {
                if ($show->genres) {
                    foreach ($show->genres as $genre) {
                        $query->orWhereJsonContains('genres', $genre);
                    }
                }
            })
            ->orderBy('vote_average', 'desc')
            ->limit(20)
            ->get(['id', 'tmdb_id', 'name', 'poster_path', 'first_air_date', 'vote_average', 'vote_count']);

        return response()->json($similar);
    }

    public function recommendations($id)
    {
        return $this->similar($id);
    }
}