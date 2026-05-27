<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DadosCartao extends Model
{
    protected $table = 'dados_cartao';

    protected $fillable = [
        'user_id',
        'nome_titular',
        'numero_cartao',
        'vencimento',
        'cvv',
        'cpf'
    ];
}

