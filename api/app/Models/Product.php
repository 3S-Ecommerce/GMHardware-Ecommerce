<?php

namespace App\Models;
use App\Models\Category;
use App\Models\Admin;
use App\Models\Order_Items;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $appends = ['image_url'];
    
    protected $fillable = ['id_category', 'id_admin', 'name', 'price', 'description', 'details', 'stock', 'last_price', 'image', 'image_2', 'image_3', 'image_4', 'image_5'];

    //protected $casts = ['details' => 'array'];

    // public function getImageUrlAttribute()
    // {
    //     return $this->image ? asset('storage/' . $this->image) : asset('storage/products/default.png');
    // }

    public function getImageUrlAttribute()
{
    if ($this->image) {
        // Se por algum motivo a imagem já for uma URL completa, apenas retorna ela
        if (filter_var($this->image, FILTER_VALIDATE_URL)) {
            return $this->image;
        }
        
        // 💡 Retorna a URL pública gerada diretamente pelo Cloudflare R2
        return Storage::disk('s3')->url($this->image);
    }
    
    // Fallback caso o produto não tenha imagem (coloque uma imagem default no seu bucket se quiser)
    return env('AWS_URL') . '/products/default.png';
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