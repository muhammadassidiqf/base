<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class UserId extends Model
{
    use HasFactory, Notifiable;
    use HasRoles;

    protected $table = 'user_id';
    protected $guarded = [];
    protected $primary_key = 'id';
    public $timestamps = false;

    public function users()
    {
        return $this->hasOne(User::class, 'user_id', 'id');
    }
}
