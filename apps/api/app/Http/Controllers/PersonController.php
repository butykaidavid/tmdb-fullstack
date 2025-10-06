<?php
namespace App\Http\Controllers;

use App\Models\Person;

class PersonController extends Controller
{
    public function show(int $id)
    {
        $person = Person::findOrFail($id);
        return response()->json($person);
    }
}
