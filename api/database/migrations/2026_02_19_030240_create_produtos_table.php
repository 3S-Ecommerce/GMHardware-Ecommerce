<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    // O $fillable diz ao Laravel quais campos podem ser preenchidos via código
    protected $fillable = ['nome', 'preco', 'estoque', 'id_categoria', 'detalhes', 'foto'];
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        
        Schema::create('produtos', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->decimal('preco', 10, 2);
            $table->integer('estoque')->default(0);

            $table->foreignId('id_categoria')->constrained('categorias')->onDelete('cascade');

            $table->string('foto')->nullable();
            $table->string('detalhes');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produtos');
    }
};
