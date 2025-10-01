<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with(['roles' => function ($query) {
            $query->select('id', 'name');
        }])->orderBy('created_at', 'desc')->get(['id', 'name', 'username']);
        $roles = Role::get(['id', 'name']);
        return Inertia::render('User/index', [
            'users' => $users,
            'roles' => $roles,
            'authUser' => Auth::user()->load('roles.permissions'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'username' => ['required', 'string', 'max:255', Rule::unique(User::class)],
                'password' => 'required|string|min:8',
                'roles' => 'required|string',
            ]);

            DB::beginTransaction();

            $user = new User();
            $user->name = $request->name;
            $user->username = $request->username;
            $user->password = Hash::make($request->password);
            $user->save();

            $user->assignRole($request->roles);

            DB::commit();

            return back()->with('success', 'User created successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            Log::error('Validation error creating user: ' . $e->getMessage());
            return back()->withErrors($e->errors());
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error creating user: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Failed to create user: ' . $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $request->validate([
                'name' => 'required',
                'username' => ['required', Rule::unique(User::class)->ignore($id)],
                'roles' => 'required',
            ]);

            DB::beginTransaction();
            $user = User::findOrFail($id);
            $user->name = $request->name;
            $user->username = $request->username;
            if ($request->password) {
                $user->password = Hash::make($request->password);
            }
            $user->status = $request->roles;
            $user->save();

            $user->syncRoles($request->roles);
            DB::commit();
            return redirect()->route('users')->with('success', 'User updated successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            Log::error('Validation error creating user: ' . $e->getMessage());
            return back()->withErrors($e->errors());
        } catch (\Exception $e) {
            Log::error('Error creating user: ' . $e->getMessage());
            DB::rollBack();
            return back()->with('error', 'Failed to update user');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
