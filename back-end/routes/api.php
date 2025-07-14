<?php

use App\Http\Controllers\AvailableTimeController;
use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\TeacherController;


Route::get('/check-user', [RegistrationController::class, 'checkUser']);

Route::post('/register', [RegistrationController::class, 'register']);

Route::get('/teachers', [TeacherController::class, 'index']);
Route::get('/availableTime', [AvailableTimeController::class, 'index']);

Route::post('/reserve', [ReservationController::class, 'store']);

Route::get('/reservations/teachers/{telegramId}', [ReservationController::class, 'reservedTeachersByUser']);

// لیست رزروهای یک کاربر همراه با اطلاعات کامل
Route::get('/reservations/details/{telegramId}', [ReservationController::class, 'detailedReservations']);

// حذف رزرو
Route::delete('/reservations/{id}', [ReservationController::class, 'destroy']);

Route::get('/teacher-reservations', [ReservationController::class, 'byTeacherTelegramId']);


Route::delete('/reservations/cancel/{id}', [ReservationController::class, 'cancelReservation']);



Route::get('/teacher/available-times', [AvailableTimeController::class,'listByTeacher']);
Route::put('/available-times/{id}', [AvailableTimeController::class,'updateSlot']);
Route::post('/available-times', [AvailableTimeController::class, 'store']);
Route::delete('/available-times/{id}', [AvailableTimeController::class, 'destroy']);









// Route::get('/test-telegram', function () {
//     $token = '1991464642:AAG_1PuUDkcIw8otMoBJ3I-_41bD7974YsY';
//     $chatId = '7533011133';
//     $message = "✅ پیام تستی از API لوکال شما ارسال شد.";

//     $url = "https://api.telegram.org/bot{$token}/sendMessage";

//     $response = Http::post($url, [
//         'chat_id' => $chatId,
//         'text' => $message,
//     ]);

//     return response()->json([
//         'status' => 'sent',
//         'telegram_response' => $response->json(),
//     ]);
// });