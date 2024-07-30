<?php

namespace App\Http\Controllers;

use App\Models\NotifGempa;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {

        $user = $request->user();
        if ($user->role == 'user') {
            return inertia('Aut/Dashboard/DashboarUser', compact('user'));
        } else {
            $countAdmin = User::where('role', 'admin')->count();
            $countUser = User::where('role', 'user')->count();
            $countGempa = NotifGempa::whereDate('waktu_gempa', '=', now())->count();
            return inertia('Aut/Dashboard/Index', compact('user', 'countUser', 'countAdmin', 'countGempa'));
        }
    }
}
