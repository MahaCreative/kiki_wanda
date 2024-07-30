<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\PermintaanBantuan;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $user = User::create([
            'firstname' => 'admin',
            'lastname' => 'admin',
            'long' => '118.026812',
            'lat' => '-2.004105',
            'provinsi' => 'Sulawesi Barat',
            'kabupaten' => 'Makassar',
            'kode_perangkat' => '112233',
            'phone' => '085334703299',
            'address' => 'alamat jl diponegoro adfadf',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin123'),
            'role' => 'admin'
        ]);
        PermintaanBantuan::factory(10)->create();
    }
}
