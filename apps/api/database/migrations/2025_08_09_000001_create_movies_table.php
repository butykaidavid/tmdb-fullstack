<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
  public function up(): void {
    Schema::create('movies', function (Blueprint $t) {
      $t->id();
      $t->unsignedBigInteger('tmdb_id')->unique();
      $t->string('title');
      $t->string('original_title')->nullable();
      $t->text('overview')->nullable();
      $t->date('release_date')->nullable();
      $t->float('popularity')->default(0);
      $t->float('vote_average')->default(0);
      $t->integer('vote_count')->default(0);
      $t->string('poster_path')->nullable();
      $t->string('backdrop_path')->nullable();
      $t->json('raw')->nullable();
      $t->timestamps();
      $t->index(['release_date','popularity']);
    });
  }
  public function down(): void { Schema::dropIfExists('movies'); }
};
