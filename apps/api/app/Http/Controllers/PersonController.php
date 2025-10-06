<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Person;
use App\Models\MovieCredit;

class PersonController extends Controller
{
    public function popular(Request $request)
    {
        $limit = $request->query('limit', 20);
        $people = Person::query()
            ->whereNotNull('profile_path')
            ->orderBy('popularity', 'desc')
            ->limit($limit)
            ->get(['id', 'tmdb_id', 'name', 'profile_path', 'known_for_department']);
        
        return response()->json($people);
    }

    public function show($id)
    {
        $person = Person::where('tmdb_id', $id)->first();
        
        if (!$person) {
            return response()->json(['error' => 'Person not found'], 404);
        }

        return response()->json($person);
    }

    public function movieCredits($id)
    {
        $person = Person::where('tmdb_id', $id)->first();
        
        if (!$person) {
            return response()->json(['error' => 'Person not found'], 404);
        }

        $credits = MovieCredit::where('person_id', $person->id)
            ->with('movie')
            ->orderBy('release_date', 'desc')
            ->get();

        return response()->json($credits);
    }

    public function tvCredits($id)
    {
        $person = Person::where('tmdb_id', $id)->first();
        
        if (!$person) {
            return response()->json(['error' => 'Person not found'], 404);
        }

        // For now, return empty array as TV credits would need a separate table
        return response()->json([]);
    }
}