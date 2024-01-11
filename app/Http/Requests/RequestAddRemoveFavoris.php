<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestAddRemoveFavoris extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user?true:false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "location_id"=>"nullable|exists:en_locations,id",
            "achat_id"=>"nullable|exists:en_ventes,id",
            "type"=>"required|in:ACHAT,LOCATION",           
        ];
    }
}
