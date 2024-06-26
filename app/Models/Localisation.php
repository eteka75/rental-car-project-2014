<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Localisation extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'localisations';
    protected $fillable = [
        'nom',
        'ville',
        'departement',
        'commune',
        'adresse',
        'photo',
        'description',
    ];

    public function locations()
    {
        return $this->belongsToMany(
            EnLocation::class,
            'location_localisation',
            "localisation_id",
            'en_location_id',
        );
    }
}
