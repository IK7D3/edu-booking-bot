<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;
    public $timestamps = false;
    public function availableTime()
    {
        return $this->belongsTo(\App\Models\AvailableTime::class);
    }

    public function student() {
        return $this->belongsTo(User::class, 'userTelegramId', 'userTelegramId');
    }
    protected $fillable = [
        'userTelegramId',
        'teacher_id',
        'available_time_id',
    ];

}


