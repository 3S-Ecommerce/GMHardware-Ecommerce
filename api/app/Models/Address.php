<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model {
    protected $fillable = [
        'user_id', 'street', 'number', 'neighborhood', 
        'city', 'state', 'zip_code', 'type', 
        'contact_name', 'contact_phone'
    ];
}
