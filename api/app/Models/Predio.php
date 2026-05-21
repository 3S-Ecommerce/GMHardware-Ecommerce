<?php

namespace App\Models;

use App\Models\Elevador;
use Illuminate\Database\Eloquent\Model;

class Predio extends Model
{
    protected $fillable = [ 'name', 'contrato', 'endereco' ];

    public function elevadores(){
        return $this->hasMany(Elevador::class, 'predio_id');
    }
}
