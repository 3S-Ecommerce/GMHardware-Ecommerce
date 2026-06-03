<?php

namespace App\Models;

use App\Models\User;
use App\Models\Order_Items;
use App\Models\Endereco;
use App\Models\DadosCartao;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_user',
        'endereco_id',
        'endereco_snapshot',
        'total_price',
        'status',
        'payment_method',
        'card_id',
        'card_last_digits'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function order_items()
    {
        return $this->hasMany(Order_Items::class, 'id_order');
    }

    public function endereco()
    {
        return $this->belongsTo(Endereco::class, 'endereco_id');
    }

    public function cartao()
    {
        return $this->belongsTo(DadosCartao::class, 'card_id');
    }
}