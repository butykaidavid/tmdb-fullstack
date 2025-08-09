<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Movie;
use App\Models\Person;
class SearchController extends Controller {
  public function __invoke(Request $r){
    $q = $r->query('q','');
    $movies = $q ? Movie::query()->where('title','ilike',"%$q%")->limit(5)->get(['id','tmdb_id','title','poster_path']) : [];
    $people = $q ? Person::query()->where('name','ilike',"%$q%")->limit(5)->get(['id','tmdb_id','name','profile_path']) : [];
    return compact('movies','people');
  }
}
