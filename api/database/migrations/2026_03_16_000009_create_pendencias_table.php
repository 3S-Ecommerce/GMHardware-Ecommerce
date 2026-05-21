<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pendencias', function (Blueprint $table) {
            $table->id();
            $table->foreignId('elevador_id')->constrained(('elevadors'))->onDelete('cascade');
            $table->foreignId('user_id')->constrained(('users'))->onDelete('cascade');
            $table->text('priority');
            $table->text('location');
            $table->longText('pendencia');
            $table->text('status')->default('aberta');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pendencias');
    }
};
