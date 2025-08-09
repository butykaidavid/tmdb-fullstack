<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
  public function up(): void {
    Schema::create('change_logs', function (Blueprint $t) {
      $t->id();
      $t->string('entity_type');
      $t->unsignedBigInteger('tmdb_id');
      $t->timestamp('seen_at')->useCurrent();
      $t->json('raw')->nullable();
      $t->timestamps();
      $t->index(['entity_type','tmdb_id','seen_at']);
    });
  }
  public function down(): void { Schema::dropIfExists('change_logs'); }
};
