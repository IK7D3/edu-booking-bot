<?php
namespace App\Http\Controllers;

use App\Models\Teacher;

class TeacherController extends Controller
{
    public function index()
    {
        return response()->json(Teacher::all());
    }
}
