<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Admin::factory()->create([
            'name' => 'Test Admin',
            'email' => 'admin@email.com',
            'document' => '38566478910',
            'password' => bcrypt('12312312'),
            'phone_number' => '11984637756'
        ]);
    }
}
