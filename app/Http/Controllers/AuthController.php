<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|confirmed|min:6',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            // Jika otentikasi berhasil, redirect ke halaman yang ditentukan
            return redirect()->route('dashboard');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function register(Request $request)
    {
        $attr = $request->validate([
            'firstname' => 'required|string|min:3',
            'lastname' => 'nullable|string|min:3',
            'long' => 'required',
            'lat' => 'required',
            'provinsi' => 'required',
            'kabupaten' => 'required',
            'phone' => 'required|numeric|digits:12',
            'address' => 'required|string|min:10',
            'email' => 'required|email',
            'password' => 'required|alpha_dash|min:6|confirmed'
        ]);
        $attr['kode_perangkat'] = now()->format('dmy') . User::count() + 1;
        $attr['role'] = 'user';
        $user = User::create($attr);
        Auth::login($user);
    }

    public function logout()
    {
        Auth::logout();
        return redirect()->route('home');
    }
}
