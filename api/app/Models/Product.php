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
        // 1. Se não houver imagem cadastrada, retorna o link padrão
        if (!$this->image) {
            return rtrim(env('AWS_URL'), '/') . '/products/default.png';
        }

        // 2. Se a imagem já for uma URL completa (http/https), apenas retorna ela
        if (filter_var($this->image, FILTER_VALIDATE_URL)) {
            return $this->image;
        }

        // 3. Monta a URL concatenando o link do Cloudflare com o caminho do banco
        // Evita o uso do método ->url() que estava quebrando o container
        $awsUrl = env('AWS_URL');

        // Se a AWS_URL estiver configurada, faz a junção limpa limpando as barras extras
        if ($awsUrl) {
            return rtrim($awsUrl, '/') . '/' . ltrim($this->image, '/');
        }

        // Fallback local caso tudo suma
        return asset('storage/' . $this->image);
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