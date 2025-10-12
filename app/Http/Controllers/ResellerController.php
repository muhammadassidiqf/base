<?php

namespace App\Http\Controllers;

use App\Models\Reseller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ResellerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reseller = Reseller::get(['id', 'name', 'facebook', 'whatsapp', 'telegram', 'image', 'user_id', 'description']);
        return Inertia::render('Reseller/index', [
            'reseller' => $reseller,
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
                'name' => 'required',
                'description' => 'required',
                'facebook' => 'required',
                'whatsapp' => 'required',
                'telegram' => 'required',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            DB::beginTransaction();
            $filename = '';
            if ($request->hasFile('image')) {
                $filename = sha1(time());
                $name = 'uploads/' . $filename . '.' . $request->image->getClientOriginalExtension();
                $filename = $filename . '.' . $request->image->getClientOriginalExtension();
            }

            //            $user = new User();
            //            $user->name = $request->name;
            //            $user->username = $request->username;
            //            $user->password = Hash::make($request->password);
            //
            //            $user->assignRole('reseller');
            //
            //            $user->save();
            //
            //            if (!$user) {
            //                return back()->with('error', 'Failed to create user');
            //            }

            $reseller = new Reseller();

            //            $reseller->user_id = $user->id;
            $reseller->name = $request->name;
            $reseller->description = $request->description;
            $reseller->facebook = $request->facebook;
            $reseller->whatsapp = $request->whatsapp;
            $reseller->telegram = $request->telegram;
            $reseller->image = $filename;
            $reseller->save();

            if ($request->hasFile('image')) {
                Storage::disk('public')->put($name, file_get_contents($request->image), 'public');
            }

            DB::commit();
            return redirect()->route('resellers')->with('success', 'Reseller created successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            Log::error('Validation error store credit: ' . $e->getMessage());
            return back()->withErrors($e->errors());
        } catch (\Exception $e) {
            Log::error('Error creating reseller: ' . $e->getMessage());
            DB::rollBack();
            return back()->with('error', 'Failed to create reseller');
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
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'facebook' => 'required',
            'whatsapp' => 'required',
            'telegram' => 'required',
        ]);

        if ($validator->fails()) {
            Log::error('Error creating user: ' . $validator->fails());
            return back()->with('error', 'Some data is not valid');
        }

        DB::beginTransaction();
        try {
            $reseller = Reseller::findOrFail($id);

            $filename = $reseller->image;
            if ($request->hasFile('image')) {
                $filename = sha1(time());
                $name = 'uploads/' . $filename . '.' . $request->image->getClientOriginalExtension();
                $filename = $filename . '.' . $request->image->getClientOriginalExtension();
            }

            $reseller->name = $request->name;
            $reseller->description = $request->description;
            $reseller->facebook = $request->facebook;
            $reseller->whatsapp = $request->whatsapp;
            $reseller->telegram = $request->telegram;
            $reseller->image = $filename;
            $reseller->save();

            if ($request->hasFile('image')) {
                Storage::disk('public')->put($name, file_get_contents($request->image), 'public');
            }

            DB::commit();
            return redirect()->route('resellers')->with('success', 'Reseller updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Failed to update reseller');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        DB::beginTransaction();
        try {
            $reseller = Reseller::findOrFail($id);
            $user = User::findOrFail($reseller->user_id);

            if ($reseller->image) {
                Storage::disk('public')->delete('uploads/' . $reseller->image);
            }

            $reseller->delete();
            $user->delete();

            DB::commit();
            return redirect()->route('resellers')->with('success', 'Reseller deleted successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Failed to delete reseller');
        }
    }
}
