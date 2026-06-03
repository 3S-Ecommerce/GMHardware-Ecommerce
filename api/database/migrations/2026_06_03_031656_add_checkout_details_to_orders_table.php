<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->foreignId('endereco_id')
                ->nullable()
                ->after('id_user')
                ->constrained('enderecos')
                ->nullOnDelete();

            $table->text('endereco_snapshot')
                ->nullable()
                ->after('endereco_id');

            $table->string('payment_method')
                ->nullable()
                ->after('status');

            $table->foreignId('card_id')
                ->nullable()
                ->after('payment_method')
                ->constrained('dados_cartao')
                ->nullOnDelete();

            $table->string('card_last_digits', 4)
                ->nullable()
                ->after('card_id');
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['endereco_id']);
            $table->dropForeign(['card_id']);

            $table->dropColumn([
                'endereco_id',
                'endereco_snapshot',
                'payment_method',
                'card_id',
                'card_last_digits'
            ]);
        });
    }
};