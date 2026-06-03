<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Endereco extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'zip_code',
        'street',
        'number',
        'city',
        'padrao'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}