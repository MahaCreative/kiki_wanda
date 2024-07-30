<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        $query = User::where('role', 'admin');
        $users = $query->get();
        // dd($users);
        return inertia('Aut/Admin/Index', compact('users'));
    }

    public function destroy(Request $request)
    {
        $user = User::findOrFail($request->id);
        $user->delete();
        return redirect()->back();
    }

    public function create(Request $request)
    {

        $attr = $request->validate([
            'firstname' => 'required|string|min:3',
            'lastname' => 'nullable|string|min:3',
            'phone' => 'required|numeric|digits:12',
            'address' => 'required|string|min:10',
            'email' => 'required|email',
            'password' => 'required|alpha_dash|min:6|confirmed'
        ]);
        $attr['role'] = 'admin';
        $user = User::create($attr);
        return redirect()->back();
    }
}
