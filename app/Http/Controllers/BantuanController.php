<?php

namespace App\Http\Controllers;

use App\Models\PermintaanBantuan;
use Illuminate\Http\Request;

class BantuanController extends Controller
{
    public function index(Request $request)
    {
        $query = PermintaanBantuan::query();
        $bantuan = $query->latest()->get();
        return inertia('Aut/DataBantuan/Index', compact('bantuan'));
    }
}
