<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AvailableTime extends Model
{

    use HasFactory;
    public function teacher()
    {
        return $this->belongsTo(\App\Models\Teacher::class);
    }

 public $timestamps = false;
    protected $fillable = [
        'teacher_id',
        'day',
        'start_time',
        'end_time',
        'is_reserved',
    ];
}
