<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
  public function up(): void {
    Schema::create('movie_credits', function (Blueprint $t) {
      $t->id();
      $t->unsignedBigInteger('movie_id');
      $t->unsignedBigInteger('person_id');
      $t->string('credit_type');
      $t->string('character')->nullable();
      $t->string('department')->nullable();
      $t->string('job')->nullable();
      $t->integer('cast_order')->nullable();
      $t->timestamps();
      $t->unique(['movie_id','person_id','credit_type','job','character']);
    });
  }
  public function down(): void { Schema::dropIfExists('movie_credits'); }
};
