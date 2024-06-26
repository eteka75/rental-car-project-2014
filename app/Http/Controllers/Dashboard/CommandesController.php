<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class CommandesController extends Controller
{
    private static $viewFolder = "Dashboard/CLocations";
    private static $imageFolder = "storage/datas/clocations/";
    private static $pageId = "ccommandes";
    private static $pageSubid = "clocations";
    private static $pageSubid2 = "clocations";
    private static $nbPerPage = 10;

    public function __construct(){
        $statics=[
            'page_id' => self::$pageId,
            'page_subid'=>self::$pageSubid

        ];
        Inertia::share($statics);
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     */
    public function getCLocations(Request $request)
    {
        $keyword = $request->get('search');
        $perPage = self::$nbPerPage > 0 ? self::$nbPerPage : 10; 
        $total=Reservation::where('etat',1)->count();
        Inertia::share(['total'=>$total,]);
        if(!empty($keyword)){
            $commandes = Reservation::where('etat',">",0)
            
            ->whereHas('voiture', function ($query) use ($keyword) {
                $query  ->where('nom', 'like', "%{$keyword}%")
                        ->orWhere('couleur', 'like', "%{$keyword}%")
                        ->orWhere('puissance_moteur', 'like', "%{$keyword}%")
                        ->orWhere('type_transmission', 'like', "%{$keyword}%")
                        ->orWhere('immatriculation', 'like', "%{$keyword}%")
                        ->orWhere('description', 'like', "%{$keyword}%");
            })->orWhere('montant', 'like', "{$keyword}%")
            ->with('voiture')->with('location')->latest()->paginate($perPage);
        }else{

            $commandes = Reservation::where('etat',">",0)->with('voiture')->with('location')->latest()->paginate($perPage);
        }

        $count = $commandes->count();
        return Inertia::render(self::$viewFolder . '/Index', [
            'count' => $count,
            'search_text' => $keyword,
            'commandes' => $commandes,
            'page_title' => "Réservation de locations",
            'page_subtitle' => "Gestion des réservations de véhicules",
        ]);
    }

    public function getCLocation($id)
    {
        $commande = Reservation::where('etat',">",0)
        ->with('voiture')
        ->with('user')
        ->with('pays')
        ->with('pointRetrait')
        ->with('transactions')
        ->with('location')->where('id',$id)->firstOrFail();
        $code =$commande->code_reservation;
        $trans=$commande->transactions()->first();
        $data_transation=null;
        if($trans){
            $data_transation=unserialize($trans->data);
        }
        //dd($data_transation);
        return Inertia::render(self::$viewFolder . '/Show', [
            'data_transation' => $data_transation,
            'commande' => $commande,
            'page_title' => "Réservation de location",
            'page_subtitle' => "Affichage de la réservation ".$code,
        ]);
    }
   

     /**
     * Show the form for creating a new resource.
     */
    public function getExport(Request $request)
    {
        $commandes = Reservation::where('etat',">",0)
        ->with('voiture')
        ->with('pays')
        ->with('pointRetrait')
        ->with('transactions')
        ->with('location')->get();
        return Inertia::render(self::$viewFolder . '/Export', [
            'commandes' => $commandes,
            'page_title' => "Réservations de location",
            'page_subtitle' => "Export de la liste des réservations ",
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function updateEtat(Request $request)
    {
        $achatId = $request->input('id');
        $achat = Reservation::where('id',$achatId)->firstOrFail();
        $etat = $request->input('etat');
        $a_etat = $achat->etat;
        $newetat = intval($request->input('newetat'));
        $tableEtat = [1,2,3,4,5,6,7,8];
        //dd(intval($request->newetat));
        if($newetat>=0 && in_array($newetat,$tableEtat)){
            $achat->etat = $newetat;
            $d=$achat->save();
            if($d){
            Session::flash('success',
            [
                'title'=>'Mise à jour effectuée',
                'message'=>"L'état de l'achat a été effectuée avec succès !",
            ]
            );}
        }else{
            Session::flash('danger',
            [
                'title'=>'Mise à jour échouée',
                'message'=>"La mise a jour n'a pas aboutie. Veuillez revoir l'état choisie !",
            ]);
        }
       return back();
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
