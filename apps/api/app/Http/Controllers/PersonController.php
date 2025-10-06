<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\{Person, MovieCredit, Image, ExternalId};

class PersonController extends Controller
{
    public function show(Request $request, int $id)
    {
        $person = Person::findOrFail($id);

        $images = Image::query()
            ->where('entity_type', 'person')
            ->where('entity_id', $person->id)
            ->orderByDesc('vote_average')
            ->limit(12)
            ->get(['file_path','vote_average','vote_count']);

        $externalIds = ExternalId::query()
            ->where('entity_type', 'person')
            ->where('entity_id', $person->id)
            ->get(['source','value']);

        $credits = DB::table('movie_credits as mc')
            ->join('movies as m', 'm.id', '=', 'mc.movie_id')
            ->where('mc.person_id', $person->id)
            ->orderByDesc('m.popularity')
            ->limit(30)
            ->get([
                'm.id','m.title','m.poster_path','mc.credit_type','mc.character','mc.job','mc.department','mc.cast_order'
            ]);

        // known for: top 6 movies by popularity
        $knownFor = DB::table('movie_credits as mc')
            ->join('movies as m', 'm.id', '=', 'mc.movie_id')
            ->where('mc.person_id', $person->id)
            ->orderByDesc('m.popularity')
            ->limit(6)
            ->get(['m.id','m.title','m.poster_path']);

        return response()->json([
            'id' => $person->id,
            'tmdb_id' => $person->tmdb_id,
            'name' => $person->name,
            'biography' => $person->biography,
            'profile_path' => $person->profile_path,
            'birthday' => $person->birthday,
            'deathday' => $person->deathday,
            'place_of_birth' => $person->place_of_birth,
            'popularity' => $person->popularity,
            'images' => $images,
            'external_ids' => $externalIds,
            'credits' => $credits,
            'known_for' => $knownFor,
        ]);
    }
}
