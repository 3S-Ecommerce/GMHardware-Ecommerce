<?php

namespace App\Models;

use App\Models\Pendencia;
use App\Models\Predio;
use Illuminate\Database\Eloquent\Model;

class Elevador extends Model
{
    protected $fillable = [ 'predio_id', 'number' ];

    public function pendencia(){
        return $this->hasMany(Pendencia::class, 'elevador_id');
    }

    public function predio(){
        return $this->belongsTo(Predio::class,'predio_id');
    }
}
