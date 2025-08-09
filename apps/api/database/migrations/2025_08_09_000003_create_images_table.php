<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
  public function up(): void {
    Schema::create('images', function (Blueprint $t) {
      $t->id();
      $t->string('entity_type');
      $t->unsignedBigInteger('entity_id');
      $t->string('file_path');
      $t->string('type');
      $t->float('vote_average')->default(0);
      $t->integer('vote_count')->default(0);
      $t->json('raw')->nullable();
      $t->timestamps();
      $t->index(['entity_type','entity_id']);
    });
  }
  public function down(): void { Schema::dropIfExists('images'); }
};
