<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class OtpSource extends Model
{
    use HasFactory, Notifiable;
    use HasRoles;
    use SoftDeletes;

    protected $table = 'otp_source';
    protected $guarded = [];
    protected $primary_key = 'id';

    public function assign_to()
    {
        return $this->belongsTo(User::class, 'assign_to', 'id');
    }

    public function create_by()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
}
