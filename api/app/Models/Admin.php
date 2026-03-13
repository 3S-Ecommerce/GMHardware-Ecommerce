<?php

namespace App\Models;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    /** @use HasFactory<\Database\Factories\AdminFactory> */
    use HasFactory;

    protected $fillable = ['name','email','password','phone_number','document','active'];

    protected $hidden = ['password','remember_token','document'];
    public function products(){
        return $this->hasMany(Product::class, 'id_admin');
    }
}
