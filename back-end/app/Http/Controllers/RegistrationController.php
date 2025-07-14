<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RegistrationController extends Controller
{

        /** آی‌دی تلگرام استادها */
    private array $teacherTelegramIds = [
        '111111111',  // مثال استاد ۱
        '1234567890',  // مثال استاد ۲
        // ...
    ];


    public function checkUser(Request $request)
    {
        $telegramId = $request->query('userTelegramId');

        $user = User::where('userTelegramId', $telegramId)->first();

        // تشخیص نقش
        $role = in_array($telegramId, $this->teacherTelegramIds)
                ? 'teacher'
                : 'student';

        return response()->json([
            'registered' => (bool) $user,
            'role'       => $role,   // ← نقش جدید
        ]);
    }


    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'userTelegramId' => 'required|numeric',
            'name' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'stuId' => 'required|digits_between:7,8',
            'phone' => ['required', 'regex:/^0\d{10}$/'],
        ], [
            'stuId.required' => 'لطفاً شماره دانشجویی را وارد کنید.',
            'stuId.digits_between' => 'شماره دانشجویی باید بین ۷ تا ۸ رقم باشد.',
            'name.required' => 'نام الزامی است.',
            'lastName.required' => 'نام خانوادگی الزامی است.',
            'phone.required' => 'شماره تماس الزامی است.',
            'phone.regex' => '!!شماره تماس نامعتبر است',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'message' => 'خطای اعتبارسنجی',
                'errors' => $validator->errors()
            ], 422);
        }
    
        $validated = $validator->validated();
    
        $user = User::create($validated);
        return response()->json([
            'message' => 'اطلاعات با موفقیت ثبت شد.',
            'data' => $user
        ], 201);
    }

}
