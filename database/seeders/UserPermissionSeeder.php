<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    private $permissions = [
        'role',
        'user',
        'permission',
        'dashboard',
    ];
    public function run(): void
    {
        foreach ($this->permissions as $permission) {
            Permission::create(['name' => $permission]);
        }


        $user = User::create([
            'name' => 'Superadmin',
            'username' => 'superadmin',
            'email' => 'superadmin@gmail.com',
            'password' => Hash::make('12345678')
        ]);

        $role = Role::create(['name' => 'Superadmin']);

        $permissions = Permission::pluck('id', 'id')->all();

        $role->syncPermissions($permissions);

        if ($user && $role) {
            $user->assignRole([$role->id]);
        }
    }
}
