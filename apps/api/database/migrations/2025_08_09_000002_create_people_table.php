<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
  public function up(): void {
    Schema::create('people', function (Blueprint $t) {
      $t->id();
      $t->unsignedBigInteger('tmdb_id')->unique();
      $t->string('name');
      $t->date('birthday')->nullable();
      $t->date('deathday')->nullable();
      $t->string('place_of_birth')->nullable();
      $t->text('biography')->nullable();
      $t->string('profile_path')->nullable();
      $t->float('popularity')->default(0);
      $t->json('raw')->nullable();
      $t->timestamps();
      $t->index(['popularity']);
    });
  }
  public function down(): void { Schema::dropIfExists('people'); }
};
