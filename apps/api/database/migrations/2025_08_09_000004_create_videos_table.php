<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
  public function up(): void {
    Schema::create('videos', function (Blueprint $t) {
      $t->id();
      $t->string('entity_type');
      $t->unsignedBigInteger('entity_id');
      $t->string('site');
      $t->string('key');
      $t->string('type');
      $t->boolean('official')->default(false);
      $t->string('name');
      $t->json('raw')->nullable();
      $t->timestamps();
      $t->index(['entity_type','entity_id']);
    });
  }
  public function down(): void { Schema::dropIfExists('videos'); }
};
