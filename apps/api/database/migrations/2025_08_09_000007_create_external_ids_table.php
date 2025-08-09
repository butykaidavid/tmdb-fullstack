<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
  public function up(): void {
    Schema::create('external_ids', function (Blueprint $t) {
      $t->id();
      $t->string('entity_type');
      $t->unsignedBigInteger('entity_id');
      $t->string('source');
      $t->string('value');
      $t->timestamps();
      $t->unique(['entity_type','entity_id','source']);
    });
  }
  public function down(): void { Schema::dropIfExists('external_ids'); }
};
