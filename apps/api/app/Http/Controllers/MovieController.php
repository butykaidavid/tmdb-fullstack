<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\{Movie, Translation, MovieCredit, Video, Image};

class MovieController extends Controller
{
    public function show(Request $request, int $id)
    {
        $movie = Movie::findOrFail($id);
        $lang = $request->query('lang');

        $translation = null;
        if ($lang) {
            $translation = Translation::where([
                'entity_type' => 'movie',
                'entity_id' => $movie->id,
                'lang' => $lang,
            ])->first();
        }

        $cast = DB::table('movie_credits as mc')
            ->join('people as p', 'p.id', '=', 'mc.person_id')
            ->where('mc.movie_id', $movie->id)
            ->where('mc.credit_type', 'cast')
            ->orderByRaw('mc.cast_order nulls last')
            ->limit(15)
            ->get([
                'p.id', 'p.name', 'p.profile_path', 'mc.character', 'mc.cast_order'
            ]);

        $videos = Video::query()
            ->where('entity_type', 'movie')
            ->where('entity_id', $movie->id)
            ->orderByDesc('official')
            ->get(['site','key','name','type','official']);

        $images = Image::query()
            ->where('entity_type', 'movie')
            ->where('entity_id', $movie->id)
            ->orderByDesc('vote_average')
            ->limit(12)
            ->get(['file_path','type','vote_average','vote_count']);

        return response()->json([
            'id' => $movie->id,
            'tmdb_id' => $movie->tmdb_id,
            'title' => $translation->title ?? $movie->title,
            'overview' => $translation->overview ?? $movie->overview,
            'release_date' => $movie->release_date,
            'poster_path' => $movie->poster_path,
            'backdrop_path' => $movie->backdrop_path,
            'popularity' => $movie->popularity,
            'vote_average' => $movie->vote_average,
            'vote_count' => $movie->vote_count,
            'cast' => $cast,
            'videos' => $videos,
            'images' => $images,
        ]);
    }

    public function popular(Request $request)
    {
        $limit = (int) ($request->query('limit', 20));
        $limit = max(1, min($limit, 100));

        $movies = Movie::query()
            ->orderByDesc('popularity')
            ->limit($limit)
            ->get(['id','tmdb_id','title','poster_path','backdrop_path','popularity','vote_average']);

        return response()->json(['results' => $movies]);
    }
}
