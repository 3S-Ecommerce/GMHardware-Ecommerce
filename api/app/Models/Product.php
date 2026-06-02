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
        // O link público do seu Bucket Cloudflare (Subdomínio R2.dev ou domínio customizado)
        // 💡 Pegamos direto da env, mas deixamos o seu link público real como fallback absoluto!
        $publicUrl = env('AWS_URL', 'https://pub-38889ba16be84990a69dfca8fd011b2c.r2.dev');

        // 1. Se não houver imagem cadastrada no banco, retorna o placeholder direto da nuvem
        if (!$this->image) {
            return rtrim($publicUrl, '/') . '/products/default.png';
        }

        // 2. Se a imagem gravada já for uma URL completa (http/https), apenas retorna ela
        if (filter_var($this->image, FILTER_VALIDATE_URL)) {
            return $this->image;
        }

        // 3. Monta a URL final apontando SEMPRE para o Cloudflare R2
        // Isso remove o 'storage/' da rota que o Render tentava forçar e quebrava com NS_BINDING_ABORTED
        return rtrim($publicUrl, '/') . '/' . ltrim($this->image, '/');
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