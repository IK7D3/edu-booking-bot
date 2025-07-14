<?php
namespace App\Http\Controllers;

use App\Models\AvailableTime;
use App\Models\Teacher;
use Illuminate\Http\Request;

class AvailableTimeController extends Controller
{
    public function index(Request $request)
{
    $query = AvailableTime::query();

    if ($request->has('teacher_id')) {
        $query->where('teacher_id', $request->teacher_id);
    }

    if ($request->has('day')) {
        $query->where('day', $request->day);
    }

    if ($request->has('is_reserved')) {
        $query->where('is_reserved', $request->is_reserved);
    }

    return response()->json($query->get());
    }
    /* لیست همه اسلات‌ها برای یک استاد */
    public function listByTeacher(Request $request)
    {
        $tid = $request->query('teacher_id');
        if (!$tid) return response()->json(['error'=>'teacher_id?'], 422);

        $slots = AvailableTime::where('teacher_id', $tid)
                 ->orderByRaw("FIELD(day,'شنبه','یک‌شنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنج‌شنبه')")
                 ->orderBy('start_time')
                 ->get()
                 ->groupBy('day');

        return response()->json($slots);
    }

    /* ویرایش یک اسلات */
    public function updateSlot(Request $request, $id)
    {
        $slot = AvailableTime::find($id);
        if (!$slot) return response()->json(['message'=>'not found'],404);
        if ($slot->is_reserved)
            return response()->json(['message'=>'این تایم رزرو شده و قابل تغییر نیست'],409);

        $data = $request->validate([
            'start_time' => 'required|date_format:H:i:s',
            'end_time'   => 'required|date_format:H:i:s|after:start_time',
        ]);

        $slot->update($data);
        return response()->json(['status'=>'updated', 'slot'=>$slot]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'teacher_id' => 'required|exists:teachers,id',
            'day'        => 'required|string',
            'start_time' => 'required|date_format:H:i:s',
            'end_time'   => 'required|date_format:H:i:s|after:start_time',
        ]);

        $slot = AvailableTime::create([
            'teacher_id'  => $data['teacher_id'],
            'day'         => $data['day'],
            'start_time'  => $data['start_time'],
            'end_time'    => $data['end_time'],
            'is_reserved' => 0,
        ]);

        return response()->json(['status' => 'created', 'slot' => $slot]);
    }

    public function destroy($id)
    {
        $slot = AvailableTime::find($id);
        if (!$slot) return response()->json(['message' => 'not found'], 404);
        if ($slot->is_reserved)
            return response()->json(['message' => 'این تایم رزرو شده و قابل حذف نیست'], 409);

        $slot->delete();
        return response()->json(['status' => 'deleted']);
    }

}
