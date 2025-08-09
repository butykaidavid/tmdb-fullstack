<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
class HealthController {
  public function __invoke() { return response()->json(['status'=>'ok']); }
}
