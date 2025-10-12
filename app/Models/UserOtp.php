<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class UserOtp extends Model
{
    use HasFactory, Notifiable;
    use HasRoles;

    protected $table = 'user_otp';
    protected $guarded = [];
    protected $primary_key = 'id';

    //abaikan created_at dan updated_at
    public $timestamps = false;
}
