<?php

namespace App\Http\Controllers;

use App\Models\NotifGempa;
use Illuminate\Http\Request;

class DataGempaController extends Controller
{
    public function index(Request $request)
    {
        $query = NotifGempa::query();
        $notif = $query->get();
        // dd($notif);
        return inertia('Aut/DataGempa/Index', compact('notif'));
    }
}
