<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
  public function up(): void {
    Schema::create('companies', function (Blueprint $t) {
      $t->id(); $t->unsignedBigInteger('tmdb_id')->unique(); $t->string('name');
      $t->string('origin_country')->nullable(); $t->string('logo_path')->nullable();
      $t->json('raw')->nullable(); $t->timestamps();
    });
    Schema::create('networks', function (Blueprint $t) {
      $t->id(); $t->unsignedBigInteger('tmdb_id')->unique(); $t->string('name');
      $t->string('origin_country')->nullable(); $t->string('logo_path')->nullable();
      $t->json('raw')->nullable(); $t->timestamps();
    });
    Schema::create('collections', function (Blueprint $t) {
      $t->id(); $t->unsignedBigInteger('tmdb_id')->unique(); $t->string('name');
      $t->string('poster_path')->nullable(); $t->string('backdrop_path')->nullable();
      $t->json('raw')->nullable(); $t->timestamps();
    });
    Schema::create('genres', function (Blueprint $t) {
      $t->id(); $t->unsignedBigInteger('tmdb_id'); $t->string('name'); $t->string('media_type');
      $t->timestamps(); $t->unique(['tmdb_id','media_type']);
    });
    Schema::create('keywords', function (Blueprint $t) {
      $t->id(); $t->unsignedBigInteger('tmdb_id')->unique(); $t->string('name'); $t->timestamps();
    });
    Schema::create('watch_providers', function (Blueprint $t) {
      $t->id(); $t->unsignedBigInteger('tmdb_id')->unique(); $t->string('provider_name'); $t->string('logo_path')->nullable(); $t->timestamps();
    });
    Schema::create('entity_providers', function (Blueprint $t) {
      $t->id(); $t->string('entity_type'); $t->unsignedBigInteger('entity_id');
      $t->unsignedBigInteger('watch_provider_id'); $t->string('region',2); $t->string('offer_type');
      $t->timestamps(); $t->unique(['entity_type','entity_id','watch_provider_id','region','offer_type']);
    });
    Schema::create('release_dates', function (Blueprint $t) {
      $t->id(); $t->unsignedBigInteger('movie_id'); $t->string('region',2);
      $t->date('release_date'); $t->string('certification')->nullable(); $t->string('type')->nullable();
      $t->timestamps(); $t->index(['movie_id','region']);
    });
    Schema::create('certifications', function (Blueprint $t) {
      $t->id(); $t->string('media_type'); $t->string('country',2); $t->string('cert');
      $t->string('meaning')->nullable(); $t->integer('order')->default(0);
      $t->timestamps(); $t->unique(['media_type','country','cert']);
    });
  }
  public function down(): void {
    Schema::dropIfExists('certifications'); Schema::dropIfExists('release_dates'); Schema::dropIfExists('entity_providers'); Schema::dropIfExists('watch_providers'); Schema::dropIfExists('keywords'); Schema::dropIfExists('genres'); Schema::dropIfExists('collections'); Schema::dropIfExists('networks'); Schema::dropIfExists('companies');
  }
};
