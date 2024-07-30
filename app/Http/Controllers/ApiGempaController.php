<?php

namespace App\Http\Controllers;

use App\Models\DataGempa;
use App\Models\NotifGempa;
use App\Models\PermintaanBantuan;
use App\Models\User;
use Illuminate\Http\Request;

class ApiGempaController extends Controller
{

    public function index(Request $request)
    {
        $id = $request->user_id;

        $data = DataGempa::where('user_id', $id)->latest()->get()->take(20);
        return response()->json($data);
    }

    public function bantuan(Request $request)
    {
        $bantuan = PermintaanBantuan::whereDate('created_at', '=', now())->latest()->get();
        return response()->json($bantuan);
    }

    public function minta_bantuan(Request $request)
    {
        $kodePerangkat = $request->kode_perangkat;
        $user = User::where('kode_perangkat', $kodePerangkat)->first();
        $bantuan = PermintaanBantuan::create([
            'lat' => $user->lat,
            'long' => $user->long,
            'nama' => $user->firstname . " " . $user->lastname,
            'telephone' => $user->phone,
        ]);
        $getAdmin = User::where('role', 'admin')->get();
        foreach ($getAdmin as $item) {
            $data = array(
                'target' => $item->phone,
                'message' => "
Peringatan Rumah Roboh!!!.

Halo admin, segera bertindak. Kemungkinan ada rumah yang rubuh akibat gempa bumi berikut detailnya
* Nama Peminta Bantuan : $bantuan->nama
* WhatsApp Number : $bantuan->telephone

Segera Lakukan Tindakan Darurat.

                ",

            );
            $this->sentnotif($data);
            $data2 = array(
                'target' => $item->phone,
                'location' => "$user->lat, $user->long",


            );
            $this->sentnotif($data2);
        }
    }


    public function konekPerangkat(Request $request)
    {
        $kodePerangkat = $request->kode_perangkat;
        $user = User::where('kode_perangkat', $kodePerangkat)->first();
        if ($user) {
            return response()->json([
                'status' => "true",
            ]);
        }
        return response()->json([
            'status' => "false",
        ]);
    }

    public function store(Request $request)
    {
        $kodePerangkat = $request->kode_perangkat;
        $user = User::where('kode_perangkat', $kodePerangkat)->first();

        $data = DataGempa::create([
            'user_id' => $user->id,
            'data_gempa' => $request->data_gempa
        ]);
        if ($request->data_gempa >= 5000) {
            $userAll = User::all();
            $notif = NotifGempa::create([
                'waktu_gempa' => now(),
                'jam_gempa' => now()->format('H:i:s'),
                'besar_getaran' => $request->data_gempa,
                'lat' => $user->lat,
                'long' => $user->long,
            ]);
            foreach ($userAll as $item) {
                $data = array(
                    'target' => $item->phone,
                    'message' => "
Kami memberitahukan kepada anda, telah terjadi gempa di Kabupaten $user->kabupaten Provinsi $user->provinsi pada waktu
* Tanggal : $notif->waktu_gempa
* Jam : $notif->jam_gempa
Waspada terjadi gempa susulan.

                ",

                );
                $this->sentnotif($data);
                $data2 = array(
                    'target' => $item->phone,
                    'location' => "$user->lat, $user->long",


                );
                $this->sentnotif($data2);
            }
        }
    }

    public function getPeringatanGempa()
    {
        $notifGempa = NotifGempa::whereDate('waktu_gempa', '=', now())->latest()->get()->take(1);
        return response()->json($notifGempa);
    }

    public function sentnotif($data)
    {



        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.fonnte.com/send',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => $data,

            CURLOPT_HTTPHEADER => array(
                'Authorization: AiND+5eFUBHjS53uWzB5' //change TOKEN to your actual token
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);
    }
}
