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
    Schema::create('dados_cartao', function (Blueprint $table) {
        $table->id();

        // Relaciona com o ID do usuário que está logado
        $table->foreignId('user_id')->constrained('users')->onDelete('cascade');

        $table->string('nome_titular');   // Nome do titular
        $table->string('numero_cartao');  // Numero do cartão
        $table->string('vencimento');     // Vencimento (ex: 00/00)
        $table->string('cvv');            // CVV
        $table->string('cpf');            // CPF

        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dados_cartao');
    }
};
