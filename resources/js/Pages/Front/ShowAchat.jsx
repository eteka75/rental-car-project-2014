import FrontLayout from '@/Layouts/FrontLayout';
import ModaleImage from '@/components/ModaleImage';
import ModaleShow from '@/components/ModaleShow';
import FrontBreadcrumbs from '@/components/front/FrontBreadcrumbs';
import PageTitle from '@/components/front/PageTitle';
import CardShowInfo from '@/components/locations/CardShowInfo';
import { ShowInfo, VenteVoitureCard2 } from '@/components/locations/LocaVoitureCard';
import "@/css/front.css";
import i18n from '@/i18n';
import { AddCartBtn, AddFavorisBtn } from '@/reducers/Cart';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { formaterMontant, setTarif } from '@/tools/utils';
import { Button, Card, CardBody, Carousel } from '@material-tailwind/react';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaEye } from 'react-icons/fa';
import { IoIosChatbubbles } from 'react-icons/io';
import { MdOutlineShoppingCartCheckout } from 'react-icons/md';
import { LazyLoadImage } from 'react-lazy-load-image-component';
export default function ShowAchat({ vente, info, ventes_suggestion }) {
    const [voiture, setVoiture] = useState(null);
    useEffect(() => {
        const { voiture } = vente;
        setVoiture(voiture);
    }, [])
    const { t } = useTranslation();
    return (
        <FrontLayout>
            <PageTitle head={false} title={vente?.voiture?.nom}>
                <FrontBreadcrumbs pages={[{ 'url': route("front.achats"), 'page': ("Achat de voitures") }, { 'url': "", 'page': (vente?.voiture?.nom) }]} />

            </PageTitle>
            <div className="max-w-screen-xl mx-auto px-4 py-4">
                <div className="grid grid-cols-12 gap-4 ">
                    <div className="col-span-12 hidden">
                        <h1 className='text-2xl font-extrabold'>{voiture?.nom}</h1>
                        <div className="text-xl font-normal text-slate-600 dark:text-white">{voiture?.marque?.nom}</div>

                    </div>
                    <div className="lg:col-span-8 col-span-12">

                        <div className="">
                            {(voiture?.medias && voiture?.medias?.length > 0) ?
                                <div className="relative">
                                    <div className="p  rounded-lg absolute h-32 lg:h-44 bottom-0 bg-gradient-to-t from-gray-800 z-10  w-full">
                                    </div>
                                    <ModaleShow title={voiture?.nom}>

                                        <Carousel
                                            className="carrousel rounded-xl "
                                            loop={true}
                                            transition={{ type: "tween", duration: .65 }}
                                            autoplay={true}
                                            //autoplayDelay={10000}
                                            navigation={({ setActiveIndex, activeIndex, length }) => (
                                                <div className="absolute bottom-4 left-2/4 z-50 flex flex-wrap -translate-x-2/4 gap-2">
                                                    {new Array(length).fill("").map((_, i) => (
                                                        <span
                                                            key={i}
                                                            className={`block h-2 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                                                                }`}
                                                            onClick={() => setActiveIndex(i)}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        >
                                            {voiture?.photo && <LazyLoadImage src={HTTP_FRONTEND_HOME + "" + voiture?.photo} className='h-[350px] md:h-[550px] transition-all duration-300 w-full max-w-full rounded-none object-cover shadow-sm object-center' alt={voiture?.nom} />}
                                            {voiture?.medias?.map((media, idx) => (
                                                <LazyLoadImage key={idx} src={HTTP_FRONTEND_HOME + "" + media?.url} className='h-[350px] md:h-[550px] transition-all duration-300 w-full max-w-full rounded-none object-cover shadow-sm object-center' alt={media?.nom} />
                                            ))}
                                        </Carousel>
                                    </ModaleShow>

                                </div>
                                :
                                <ModaleImage url={HTTP_FRONTEND_HOME + "" + voiture?.photo} title={voiture?.nom} >
                                    {voiture?.photo && <LazyLoadImage src={HTTP_FRONTEND_HOME + "" + voiture?.photo} className='h-[350px] md:h-[550px] transition-all duration-300 w-full max-w-full rounded-xl  object-cover shadow-md object-center' alt={voiture?.nom} />}
                                </ModaleImage>
                            }
                            <div className="md:flex justify-between">

                                {vente?.views > 0 &&
                                    <Tooltip placement='top-start' title='Nombre de vues' content='Nombre de vues'>
                                        <div className="pt-3 mx-2 items-center flex flex-wrap gap-2 text-slate-500">
                                            <FaEye /> <span className="flex md:hidden">Nombre de vues : </span>  {vente?.views}
                                        </div>
                                    </Tooltip>
                                }
                                <div className="md:pt-2 flex flex-wrap md:gap-4">
                                    <AddFavorisBtn
                                        id={vente?.id}
                                        nom={vente?.voiture?.nom}
                                        photo={vente?.voiture?.photo}
                                        prix={vente?.prix_vente}
                                    />
                                    <AddCartBtn
                                        id={vente?.id}
                                        nom={vente?.voiture?.nom}
                                        photo={vente?.voiture?.photo}
                                        prix={vente?.prix_vente}
                                    />
                                </div>
                            </div>
                            <div className='py-4'>

                                <ShowInfo
                                    nb_personne={voiture?.nombre_place}
                                    type_boite={voiture?.type_transmission}
                                    vitesse={voiture?.nombre_vitesse}
                                    nb_grande_valise={voiture?.nombre_grande_valise}
                                    nb_petite_valise={voiture?.nombre_petite_valise}
                                    volume_coffre={voiture?.volume_coffre}
                                    marque={voiture?.marque?.nom}
                                    dimenssions={voiture?.dimenssions}
                                    categorie={voiture?.categorie?.nom}
                                    np_portes={voiture?.nombre_portes}
                                    nom={voiture?.nom}
                                    consommation={voiture?.consommation}
                                    carburant={voiture?.type_carburant?.nom}
                                    photo={voiture?.photo}
                                    puissance={voiture?.puissance_moteur}
                                    emission_co2={voiture?.emission_co2}
                                    eclairage={voiture?.type_eclairage}
                                    suspenssion={voiture?.type_suspenssion}
                                    capacite={voiture?.capacite_reservoir}
                                    tarif={formaterMontant(vente?.prix_vente, i18n.language)}
                                />
                                {voiture?.systeme_securites?.length > 0 &&
                                    <div className=" py-8 pb-4 border-b  ">
                                        <h2 className="text-xl font-bold">Systèmes de sécurité à bord</h2>
                                        <p className="text-md py-4">
                                            <ul>
                                                {voiture?.systeme_securites?.map((system, idx) => (
                                                    <li key={idx} className='flex text-md pb-2'>
                                                        <AiOutlineCheck className='me-2' />
                                                        {system?.nom}
                                                    </li>
                                                ))}
                                            </ul>
                                        </p>
                                    </div>
                                }
                                {voiture?.technologies_a_bord != null &&
                                    <div className='py-6 border-b'>
                                        <h2 className="text-xl font-bold">Autres technologies </h2>
                                        {voiture?.technologies_a_bord}
                                    </div>
                                }

                                {vente?.description &&
                                    <div className="py-8">
                                        <h2 className="text-xl font-bold">Description</h2>
                                        <p className="text-md py-2">
                                            <div id='_html' className='html' dangerouslySetInnerHTML={{ __html: vente?.description }}></div>
                                        </p>
                                    </div>
                                }
                            </div>

                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-4 pb-12">
                        <Card className="shadow-none w-full bg-[#F2FFF7] border-[#39935d] border mb-6 rounded-lg">
                            <CardBody className="pb-2">
                                <div className="mb-4 border-b_">
                                    <h1 className='text-2xl font-extrabold'>{voiture?.nom}</h1>
                                    <div className="text-xl font-normal text-slate-600 dark:text-white">{voiture?.categorie?.nom}</div>

                                </div>
                                <div className="flex bg-zinc-50_shadow-sm justify-between py-4 border-[#cfddd5] border-b flex-wrap bg gap-4  ">
                                    <div className=' w-1/4 font-bold'>
                                        {t('Marque')}
                                    </div>
                                    <div >
                                        {voiture?.marque?.nom}
                                    </div>
                                </div>
                                {voiture?.annee_fabrication != "null" &&
                                    <div className="flex   py-4 border-b border-[#cfddd5] justify-between  flex-wrap gap-4  ">
                                        <div className='w-1/4 font-bold'>
                                            {t('Année')}
                                        </div>
                                        <div>
                                            {voiture?.annee_fabrication}
                                        </div>
                                    </div>}
                                {parseInt(voiture?.kilometrage) > 0 &&
                                    <div className="flex   py-4 border-b justify-between border-[#cfddd5] flex-wrap gap-4  ">
                                        <div className='w-1/4 font-bold'>
                                            {t('Kilométrage')} Km
                                        </div>
                                        <div>
                                            {vente?.kilometrage}
                                        </div>
                                    </div>}
                                {voiture?.couleur != null && voiture?.couleur != '' &&
                                    <div className="flex justify-between py-4 border-b  border-[#cfddd5] flex-wrap gap-4  ">
                                        <div className='w-1/4 font-bold'>
                                            {t('Couleur')}
                                        </div>
                                        <div>
                                            {voiture?.couleur}
                                        </div>
                                    </div>
                                }

                                {vente?.prix_vente > 0 &&
                                    <div className="flex justify-between py-4 border-b  border-[#cfddd5]  flex-wrap gap-4  ">
                                        <div className='w-1/4 font-bold'>
                                            {t('Prix')}
                                        </div>
                                        <div className='text-2xl font-extrabold text-red-500'>
                                            {formaterMontant(vente?.prix_vente, i18n.language)}
                                        </div>
                                    </div>
                                }


                                <div className="">

                                    <Button color='white' v className='w-full  text-white bg-emerald-600 flex flex-wrap gap-2 items-center justify-center py-4 dark:text-yellow-600 hover:bg-black my-4'>
                                        <MdOutlineShoppingCartCheckout className='h-5 w-6' /> Commander
                                    </Button>
                                    <Button color='blue' v className='w-full flex flex-wrap gap-2 items-center hover:bg-blue-700 justify-center x-6 mb-4'>
                                        <IoIosChatbubbles className='h-6 w-6' />  Envoyer un message
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                        {info?.id > 0 &&
                            <CardShowInfo
                                title="Besoin d'aide ? "
                                url={route('front.faq', { id: info?.id })}
                                photo={info?.photo}
                                content={info?.contenu}
                                btninfo='Consulter le FAQ'
                            />}
                    </div>

                </div>


            </div>
            <div className="bg-blue-50 shadow-inner py-4 lg:py-8">
                <div className="max-w-screen-xl mx-auto">
                    <div className="p-4">
                        <h2 className="text-lg lg:text-2xl font-bold uppercase mb-4">Recommandations</h2>
                        {ventes_suggestion != null && ventes_suggestion?.length > 0 &&
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 mt-4  lg:grid-cols-3 md:mt-8  gap-4">
                                    {ventes_suggestion?.map(({ voiture, id, tarif_location_heure,
                                        tarif_location_journalier, tarif_location_hebdomadaire,
                                        tarif_location_mensuel, duree_garantie, kilometrage, prix_vente
                                    }, index) => {
                                        return <VenteVoitureCard2
                                            id={id}
                                            garantie={duree_garantie}
                                            prix_vente={prix_vente}
                                            kilometrage={kilometrage}
                                            annee_fabrication={voiture?.annee_fabrication}
                                            nb_personne={voiture?.nombre_place}
                                            type_boite={voiture?.type_transmission}
                                            vitesse={voiture?.nombre_vitesse}
                                            nb_grande_valise={voiture?.nombre_grande_valise}
                                            nb_petite_valise={voiture?.nombre_petite_valise}
                                            volume_coffre={voiture?.volume_coffre}
                                            marque={voiture?.marque?.nom}
                                            categorie={voiture?.categorie?.nom}
                                            nom={voiture?.nom}
                                            carburant={voiture?.type_carburant?.nom}
                                            photo={voiture?.photo}
                                            puissance={voiture?.puissance_moteur}
                                            tarif={setTarif(tarif_location_heure, tarif_location_journalier, tarif_location_hebdomadaire, tarif_location_mensuel)}
                                            key={index} />
                                    })}

                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </FrontLayout>
    )
}
