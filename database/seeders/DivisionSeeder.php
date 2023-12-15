<?php

namespace Database\Seeders;

use App\Models\Division;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DivisionSeeder extends Seeder
{
    private array $data = [
        [
            'name' => 'Division 1',
        ],
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->data as $division) {
            Division::create([
                'name' => $division['name'],
                'slug' => Str::slug($division['name']),
            ]);
        }
    }
}
