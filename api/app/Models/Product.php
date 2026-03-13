<?php

namespace App\Models;
use App\Models\Category;
use App\Models\Admin;
use App\Models\Order_Items;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $appends = ['image_url'];
    
    protected $fillable = ['id_category', 'id_admin', 'name', 'price', 'description', 'details', 'stock', 'last_price', 'image'];

    //protected $casts = ['details' => 'array'];

    public function getImageUrlAttribute()
    {
        return $this->image ? asset('storage/' . $this->image) : asset('storage/products/default.png');
    }
    public function category()
    {
        return $this->belongsTo(Category::class, 'id_category');
    }
    public function admin()
    {
        return $this->belongsTo(Admin::class, 'id_admin');
    }
    public function order_items()
    {
        return $this->hasMany(Order_Items::class, 'id_product');
    }
}