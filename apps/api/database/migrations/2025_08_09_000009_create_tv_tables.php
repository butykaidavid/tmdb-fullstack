<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
  public function up(): void {
    Schema::create('tv_shows', function (Blueprint $t) {
      $t->id(); $t->unsignedBigInteger('tmdb_id')->unique();
      $t->string('name'); $t->string('original_name')->nullable();
      $t->text('overview')->nullable();
      $t->date('first_air_date')->nullable(); $t->date('last_air_date')->nullable();
      $t->string('status')->nullable();
      $t->integer('number_of_seasons')->default(0); $t->integer('number_of_episodes')->default(0);
      $t->float('popularity')->default(0); $t->float('vote_average')->default(0); $t->integer('vote_count')->default(0);
      $t->string('poster_path')->nullable(); $t->string('backdrop_path')->nullable();
      $t->json('raw')->nullable(); $t->timestamps();
      $t->index(['first_air_date','popularity']);
    });
    Schema::create('seasons', function (Blueprint $t) {
      $t->id(); $t->unsignedBigInteger('tv_show_id'); $t->integer('season_number');
      $t->string('name')->nullable(); $t->text('overview')->nullable();
      $t->date('air_date')->nullable(); $t->string('poster_path')->nullable();
      $t->json('raw')->nullable(); $t->timestamps();
      $t->unique(['tv_show_id','season_number']);
    });
    Schema::create('episodes', function (Blueprint $t) {
      $t->id(); $t->unsignedBigInteger('season_id'); $t->integer('episode_number');
      $t->string('name')->nullable(); $t->text('overview')->nullable();
      $t->date('air_date')->nullable(); $t->float('vote_average')->default(0); $t->integer('vote_count')->default(0);
      $t->string('still_path')->nullable(); $t->json('raw')->nullable(); $t->timestamps();
      $t->unique(['season_id','episode_number']); $t->index(['air_date']);
    });
  }
  public function down(): void {
    Schema::dropIfExists('episodes'); Schema::dropIfExists('seasons'); Schema::dropIfExists('tv_shows');
  }
};
