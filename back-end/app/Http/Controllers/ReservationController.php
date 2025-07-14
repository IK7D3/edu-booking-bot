<?php

namespace App\Http\Controllers;

use App\Models\AvailableTime;
use App\Models\Reservation;
use App\Models\Teacher;
use App\Models\User;
use App\Services\TelegramService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ReservationController extends Controller
{
    public function destroy($id)
    {
        $reservation = Reservation::find($id);

        if (!$reservation) {
            return response()->json(['error' => 'رزرو پیدا نشد'], 404);
        }

        // یافتن رکورد available_time مربوطه و آپدیت ستون is_reserved
        $availableTime = AvailableTime::find($reservation->available_time_id);
        if ($availableTime) {
            $availableTime->is_reserved = 0;
            $availableTime->save();
        }

        // حذف رزرو
        $reservation->delete();

        return response()->json(['status' => 'deleted']);
    }


    public function detailedReservations($telegramId)
    {
        $telegramId = (string) $telegramId;
      $reservations = Reservation::with(['availableTime.teacher'])
            ->where('userTelegramId', $telegramId)
            ->get();
        
        $result = $reservations->map(function ($reservation) {
            return [
                'id' => $reservation->id,
                'teacher_name' => $reservation->availableTime->teacher->name,
                'date' => \Carbon\Carbon::parse($reservation->availableTime->date)->format('Y/m/d'),
                'day' => $reservation->availableTime->day,
                'start_time' => \Carbon\Carbon::parse($reservation->availableTime->start_time)->format('H:i'),
                'end_time' => \Carbon\Carbon::parse($reservation->availableTime->end_time)->format('H:i'),
            ];
        });

        return response()->json($result);
    }

    public function reservedTeachersByUser($telegramId)
    {
        $teacherIds = Reservation::where('userTelegramId', $telegramId)
                        ->pluck('teacher_id');

        return response()->json($teacherIds);
    }
    public function store(Request $request)
    {
        // 1. اعتبارسنجی ورودی‌ها
        $validated = $request->validate([
            'userTelegramId'    => 'required|string',
            'teacher_id'        => 'required|exists:teachers,id',
            'available_time_id' => 'required|exists:available_times,id',
        ]);

        // 2. بارگذاری رکورد available time
        $availableTime = AvailableTime::findOrFail($validated['available_time_id']);

        // 3. بررسی اینکه این available time به همان teacher تعلق دارد
        if ($availableTime->teacher_id != $validated['teacher_id']) {
            throw ValidationException::withMessages([
                'available_time_id' => ['این زمان به این استاد تعلق ندارد.'],
            ]);
        }

        // 4. بررسی اینکه هنوز رزرو نشده
        if ($availableTime->is_reserved) {
            return response()->json([
                'message' => 'این تایم قبلاً رزرو شده است.'
            ], 409);
        }

        // 5. ایجاد رکورد جدید در reservations
        $reservation = Reservation::create([
            'userTelegramId'    => $validated['userTelegramId'],
            'teacher_id'        => $validated['teacher_id'],
            'available_time_id' => $validated['available_time_id'],
        ]);

        // 6. علامت‌گذاری available time به‌عنوان رزروشده
        $availableTime->update(['is_reserved' => 1]);

        // 7. بازگرداندن پاسخ موفق
        return response()->json([
            'message'     => 'رزرو با موفقیت انجام شد.',
            'reservation' => $reservation,
        ], 201);
    }
    public function byTeacherTelegramId(Request $request)
    {
        $telegramId = $request->query('userTelegramId');

        // پیدا کردن استاد از جدول users
        $user = User::where('userTelegramId', $telegramId)->first();
        if (!$user) {
            return response()->json(['message' => 'کاربر یافت نشد.'], 404);
        }

        // پیدا کردن شناسه استاد از جدول teachers (با نام و نام خانوادگی)
        $teacher = Teacher::where('name', $user->name . ' ' . $user->lastName)->first();
        if (!$teacher) {
            return response()->json(['message' => 'استاد در جدول teachers یافت نشد.'], 404);
        }

        // لیست رزروهای مربوط به این استاد
        $reservations = Reservation::with(['availableTime', 'student'])
            ->where('teacher_id', $teacher->id)
            ->orderBy('id', 'desc')
            ->get()
            ->map(function ($r) {
                return [
                    'id'          => $r->id,
                    'teacher_id'  => $r->teacher_id,
                    'day'         => $r->availableTime->day,
                    'start_time'  => substr($r->availableTime->start_time, 0, 5),
                    'end_time'    => substr($r->availableTime->end_time, 0, 5),
                    'studentName' => $r->student->name . ' ' . $r->student->lastName,
                    'stuId'       => $r->student->stuId,
                    'phone'       => $r->student->phone,
                ];
            });

        return response()->json($reservations);
    }

    
        public function cancelReservation($id)
    {
        $reservation = Reservation::find($id);
        
        if (!$reservation) {
            return response()->json(['error' => 'رزرو پیدا نشد'], 404);
        }

        // حذف رزرو
        $availableTime = AvailableTime::find($reservation->available_time_id);
        if ($availableTime) {
            $availableTime->is_reserved = 0;
            $availableTime->save();
        }

        $reservation->delete();

        // ارسال پیام تلگرامی
        // $telegram = new TelegramService();
        // $telegram->sendMessage($reservation->userTelegramId, "رزرو شما با موفقیت لغو شد.");

        return response()->json(['status' => 'deleted']);
    }
}
