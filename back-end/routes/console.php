<?php

use Illuminate\Support\Facades\Schedule;
use App\Models\AvailableTime;
use App\Models\Reservation;
use Carbon\Carbon;

Schedule::call(function () {
    // تعیین نام روز قبل به فارسی
    $daysFa = ['یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
    $yesterday = Carbon::now()->subDay();
    $dayIndex = $yesterday->dayOfWeek; // 0 (یک‌شنبه) تا 6 (شنبه)
    $faDayName = $daysFa[$dayIndex];

    // گرفتن همه available_times با روز قبل و is_reserved = 1
    $records = AvailableTime::where('day', $faDayName)
        ->where('is_reserved', 1)
        ->get();

    foreach ($records as $record) {
        // حذف از جدول رزروها
        Reservation::where('available_time_id', $record->id)->delete();

        // آزاد کردن تایم
        $record->is_reserved = 0;
        $record->save();
    }
})->everyMinute(); // برای تست، می‌تونی بعداً بزاری daily
