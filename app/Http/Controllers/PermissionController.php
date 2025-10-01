<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $permissions = Permission::with('roles')->get(['id', 'name']);
        return Inertia::render('Permission/index', [
            'permissions' => $permissions,
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
                'name' => 'required|lowercase',
            ]);

            DB::beginTransaction();
            $permission = new Permission();
            $permission->name = $request->name;
            $permission->save();
            DB::commit();
            return redirect()->route('permissions')->with('success', 'Permission created successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            Log::error('Validation error creating permission: ' . $e->getMessage());
            return back()->withErrors($e->errors());
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Failed to create role');
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
                'name' => 'required|lowercase',
            ]);

            DB::beginTransaction();
            $permission = Permission::findOrFail($id);
            $permission->name = $request->name;
            $permission->save();
            DB::commit();
            return redirect()->route('permissions')->with('success', 'Permission updated successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            Log::error('Validation error updating permission: ' . $e->getMessage());
            return back()->withErrors($e->errors());
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Failed to update permission');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        DB::beginTransaction();
        try {
            $permission = Permission::findOrFail($id);
            $permission->delete();
            DB::commit();
            return redirect()->route('permissions')->with('success', 'Permission deleted successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Failed to delete permission');
        }
    }
}
