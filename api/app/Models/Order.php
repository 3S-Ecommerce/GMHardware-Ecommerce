<?php

namespace App\Models;

use App\Models\User;
use App\Models\Order_Items;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    /** @use HasFactory<\Database\Factories\OrderFactory> */
    use HasFactory;

    protected $fillable = ['id_user','total_price','status'];

    public function user(){
        return $this->belongsTo(User::class, "id_user");
    }

    public function order_items(){
        return $this->hasMany(Order_Items::class,"id_order");
    }
}
