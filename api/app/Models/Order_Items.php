<?php

namespace App\Models;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order_Items extends Model
{
    /** @use HasFactory<\Database\Factories\OrderItemsFactory> */
    use HasFactory;

    protected $table = "order_items";
    protected $fillable = ['id_order','id_product','quantity','price'];
    public function order(){
        return $this->belongsTo(Order::class, "id_order");
    }
    public function product(){
        return $this->belongsTo(Product::class,"id_product");
    }
}
