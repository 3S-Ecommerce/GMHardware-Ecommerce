<?php

namespace App\Models;

use App\Models\Elevador;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Pendencia extends Model
{
    protected $fillable = [ 'elevador_id', 'user_id', 'priority', 'location', 'pendencia', 'status' ];

    public function elevador(){
        return $this->belongsTo(Elevador::class, 'elevador_id');
    }

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
}
