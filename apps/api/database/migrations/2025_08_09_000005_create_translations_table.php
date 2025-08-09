<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
  public function up(): void {
    Schema::create('translations', function (Blueprint $t) {
      $t->id();
      $t->string('entity_type');
      $t->unsignedBigInteger('entity_id');
      $t->string('lang');
      $t->string('title')->nullable();
      $t->text('overview')->nullable();
      $t->json('raw')->nullable();
      $t->timestamps();
      $t->unique(['entity_type','entity_id','lang']);
    });
  }
  public function down(): void { Schema::dropIfExists('translations'); }
};
