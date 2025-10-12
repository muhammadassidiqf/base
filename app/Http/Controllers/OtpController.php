<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OtpSource;
use App\Models\User;
use App\Models\UserOtp;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class OtpController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $otp = OtpSource::with(['assign_to:id,name', 'create_by:id,name'])
            ->where(function ($query) {
                $query->where('created_by', Auth::user()->id)
                    ->orWhere('assign_to', Auth::user()->id);
            })
            ->get(['id', 'name', 'description', 'assign_to', 'created_by', 'otp']);
        $users = User::get(['id', 'name', 'username']);
        return Inertia::render('Otp/index', [
            'otp' => $otp,
            'users' => $users,
            'authUser' => Auth::user()->load('roles.permissions'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // handled via Inertia dialog
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|unique:otp_source,name',
                'description' => 'nullable|string',
            ]);

            $user_id = $request->assign_to ? $request->assign_to : Auth::user()->id;
            $user = User::find($user_id);
            if ($user->credit < 1) {
                return back()->with('error', 'Insufficient credit to generate OTP');
            }
            $user->credit -= 1;
            $user->save();

            DB::beginTransaction();
            $otp_code = substr(str_replace(['/', '+', '='], '', base64_encode(random_bytes(12))), 0, 16);
            $user_otp = new UserOtp();
            $user_otp->code_otp = $otp_code;
            $user_otp->save();

            $otp = new OtpSource();
            $otp->name = $request->name;
            $otp->description = $request->description;
            $otp->assign_to = $request->assign_to ? $request->assign_to : Auth::user()->id;
            $otp->created_by = Auth::user()->id;
            $otp->otp = $otp_code;
            $otp->user_otp_id = $user_otp->id;
            $otp->save();

            DB::commit();
            return back()->with('success', 'OTP source created successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            Log::error('Validation error creating OTP source: ' . $e->getMessage());
            return back()->withErrors($e->errors());
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error creating OTP source: ' . $e->getMessage());
            return back()->with('error', 'Failed to create OTP source');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // not used
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // handled via Inertia dialog
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'nullable|string',
            'assign_to' => 'required|exists:users,id',
            'otp' => 'required|string',
        ]);

        if ($validator->fails()) {
            Log::error('OTP update validation failed: ' . json_encode($validator->errors()));
            return back()->with('error', 'Some data is not valid');
        }

        DB::beginTransaction();
        try {
            $otp = OtpSource::findOrFail($id);
            $otp->name = $request->name;
            $otp->description = $request->description;
            $otp->assign_to = $request->assign_to;
            $otp->otp = $request->otp;
            $otp->save();

            DB::commit();
            return redirect()->route('otp')->with('success', 'OTP source updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error updating OTP source: ' . $e->getMessage());
            return back()->with('error', 'Failed to update OTP source');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        DB::beginTransaction();
        try {
            $otp = OtpSource::findOrFail($id);
            $otp->delete();
            DB::commit();
            return redirect()->route('otp')->with('success', 'OTP source deleted successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error deleting OTP source: ' . $e->getMessage());
            return back()->with('error', 'Failed to delete OTP source');
        }
    }
}
