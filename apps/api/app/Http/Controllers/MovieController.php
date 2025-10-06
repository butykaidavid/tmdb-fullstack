<?php
namespace App\Http\Controllers;

use App\Models\Movie;

class MovieController extends Controller
{
    public function show(int $id)
    {
        $movie = Movie::findOrFail($id);
        return response()->json($movie);
    }
}
