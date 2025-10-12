<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class Reseller extends Model
{
    use HasFactory, Notifiable;
    use HasRoles;
    use SoftDeletes;

    protected $table = 'reseller';
    protected $guarded = [];
    protected $primary_key = 'id';

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
