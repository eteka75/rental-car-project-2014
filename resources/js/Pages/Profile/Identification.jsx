import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head, Link, usePage } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import DashHeadTitle from '@/components/dashboard/DashHeadTitle';
import ProfilLayout from '@/Layouts/ProfilLayout';
import IdentificationForm from './Partials/IdentificationForm';
import { LuClipboardEdit, LuFolderInput } from 'react-icons/lu';
import { DateToFront } from '@/tools/utils';
import i18n from '@/i18n';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { Alert, Button } from '@material-tailwind/react';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineCheckCircle } from 'react-icons/md';
import { PiFolderStarLight } from 'react-icons/pi';
import { IoCheckmark } from 'react-icons/io5';

export default function Identification({ page_title, page_subtitle, client }) {
    const { auth } = usePage().props
    return (
        <ProfilLayout
            user={auth.user} auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Mon compte</h2>}
        >
            <div className="py-6">
                <Head title={auth.user.prenom + " " + auth.user.nom + " | Identification "} />
                <DashHeadTitle title={page_title} subtitle={page_subtitle} />
                <div className=" space-y-6">

                    {client===null?
                    <div className="p-4 sm:p-8 flex justify-center min-h-[560px] bg-white dark:bg-gray-800 shadow sm:rounded-lg">

                            <div className="py-20 text-center">
                                <PiFolderStarLight className='h-32 mx-auto w-32 text-slate-200'/> 
                               <div className="font-semibold dark:text-slate-200"> Votre dossier d'identification est vide !</div>
                               <div className="text-xs text-slate-600"> Pour valider votre compte, vous devez soumettre votre dossier d'identification</div>
                               <Link className='' href={route('profile.identification.edit')}>
                                <Button className='py-3
                                 my-4 shadow-sm text-black border bg-gray-100'>Soummettre mon dossier </Button>
                                </Link>
                            </div>
                    </div>
                    :
                    <div className="p-4 sm:p-8 max-w-screen-lg bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <div className="border border-emerald-400 text-sm p-4 py-2 rounded-md mb-4 bg-green-100">
                            <div className="flex gap-2">
                                <LuFolderInput className='text-emerald-400 w-10 h-10' />
                                <div>
                                    <div className='font-bold uppercase'>Dossier soumis le {DateToFront(client?.created_at, i18n.language)} </div>
                                    {client?.created_at != client?.updated_at && <div>Dernière mise à jour {DateToFront(client?.updated_at, i18n.language)}</div>}
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white overflow-hidden   rounded-lg border">
                            <div className="px-4 py-5 sm:px-6 flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg leading-6 dark:text-white font-medium text-gray-900">Dossier</h3>
                                   
                                </div>
                                {client?.etat===1 ?
                                <span className='text-emerald-600 flex items-center bg-emerald-50 px-3 rounded-full py-1 gap-1 text-sm'><MdOutlineCheckCircle className='w-4 h-4'/> Validé </span>
                                :<Link className='' href={route('profile.identification.edit')}>
                                <Button size='sm' variant='text' className='py-2 flex gap-1 border' >
                                    <CiEdit />  Modifier
                                </Button></Link>
                                }

                            </div>
                            <div className="px-4 md:px-6">
                            {client?.etat===1 ?
                                    <div className=" text-md text-emerald-500">
                                        <Alert
                                            open={open}
                                            
                                            animate={{
                                            mount: { y: 0 },
                                            unmount: { y: 100 },
                                            }} className="shadow-sm w-full border-l-4 border-[#4060a6] bg-blue-50 font-medium text-[#003366]"
                                            
                                        >
                                       <div className='flex gap-1 items-center '> <IoCheckmark className='font-bold'/><b> Votre dossier est validé.</b> </div>
                                        Vous pouvez désormais acheter ou louer des voitures de votre choix.
                                        </Alert>
                                        <div className='md:flex mt-4 gap-4'>
                                            <Link href={route('front.locations')}><Button color='blue' className='dark:text-black dark:bg-yellow-500 md:w-auto font-normal mb-4 w-full'>Louer une voiture</Button></Link>
                                            <Link href={route('front.achats')}><Button color='black' variant='text' className='dark:text-yellow-500 dark:border-yellow-500 border text-blue-600 border-blue-600 md:w-auto font-normal mb-4 w-full'>Acheter une voiture</Button></Link>
                                        </div>
                                    </div> 
                                    :
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-slate-3000  dark:text-slate-50 ">
                                        Votre dossier sera étudié par les administrateurs.
                                        <span className=""> Dès qu'il est validé, vous ne pouvez plus le modifier.</span>
                                    </p>
                                    }
                            </div>
                            <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-0">
                                <dl className="sm:divide-y sm:divide-gray-200 dark:divide-gray-700">
                                    {client?.sexe != null && <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-slate-3000  dark:text-slate-50 ">
                                            Sexe
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-slate-50 sm:mt-0 sm:col-span-2">
                                            {client?.sexe == 'M' && 'Masculin'}
                                            {client?.sexe == 'F' && 'Féminin'}
                                        </dd>
                                    </div>}
                                    {client?.nom != null && <div className="py-3 sm:py-5 dark:border-gray-700 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium  text-gray-500 dark:text-slate-3000  dark:text-slate-50 ">
                                            Nom
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-slate-50 sm:mt-0 sm:col-span-2">
                                            {client?.nom}
                                        </dd>
                                    </div>}
                                    {client?.prenom != null && <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-slate-3000  dark:text-slate-50 ">
                                            Prénom(s)
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-slate-50 sm:mt-0 sm:col-span-2">
                                            {client?.prenom}
                                        </dd>
                                    </div>}
                                    {client?.ville_residence != null && <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-slate-3000  dark:text-slate-50 ">
                                            Ville de résidence
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-slate-50 sm:mt-0 sm:col-span-2">
                                            {client?.ville_residence}
                                        </dd>
                                    </div>}
                                    {(client?.numero_permis != null || client?.date_expiration_permis != null) && <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-slate-3000  dark:text-slate-50 ">
                                            Permis de conduire
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-slate-50 sm:mt-0 sm:col-span-2">
                                            {client?.numero_permis}
                                            {client?.date_expiration_permis != null && <>&nbsp;&nbsp;  / &nbsp;&nbsp; Expire le
                                               &nbsp; {DateToFront(client?.date_expiration_permis,i18n.language,'d/m/Y')}</>
                                            }
                                        </dd>
                                    </div>}
                                    {(client?.nb_annee_conduite != null) && <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-slate-3000  dark:text-slate-50 ">
                                            Nombre d'année de conduite
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-slate-50 sm:mt-0 sm:col-span-2">
                                            {client?.nb_annee_conduite}
                                            {client?.nb_annee_conduite != null && <>&nbsp;an{parseInt(client?.nb_annee_conduite) > 1 ? 's' : ''}</>
                                            }
                                        </dd>
                                    </div>}
                                    {(client?.fichier_permis != null &&  client?.fichier_permis != '') && <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-slate-3000  dark:text-slate-50 ">
                                            Fichier du permis
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-slate-50 sm:mt-0 sm:col-span-2">
                                            <a target='_blanck' className='text-blue-500' href={HTTP_FRONTEND_HOME + '' + client?.fichier_permis}>Télécharger le fichier</a>
                                        </dd>
                                    </div>}
                                    {(client?.date_naissance != null || client?.lieu_naissance != null) && <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-slate-3000  dark:text-slate-50 ">
                                            Date et lieu de naissance
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-slate-50 sm:mt-0 sm:col-span-2">
                                            {DateToFront(client?.date_naissance, i18n.language, 'd/m/Y')}
                                            {client?.lieu_naissance != null && <>&nbsp;&nbsp;  à &nbsp;&nbsp;
                                                {client?.lieu_naissance}</>
                                            }
                                        </dd>
                                    </div>}
                                    {(client?.fichier_identite != null &&  client?.fichier_identite != '') && <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-slate-3000  dark:text-slate-50 ">
                                            Fichier d'identité
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-slate-50 sm:mt-0 sm:col-span-2">
                                            <a target='_blanck' className='text-blue-500' href={HTTP_FRONTEND_HOME + '' + client?.fichier_identite}>Télécharger le fichier</a>
                                        </dd>
                                    </div>}
                                    {(client?.type_piece_identite != null || client?.numero_piece_identite != null) && <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-slate-3000  dark:text-slate-50 ">
                                            Pièce d'identité
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-slate-50 sm:mt-0 sm:col-span-2">
                                            {client?.type_piece_identite} &nbsp;&nbsp; / &nbsp;&nbsp;
                                            {client?.numero_piece_identite}
                                        </dd>
                                    </div>}
                                    {client?.adresse != null && <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-slate-3000  dark:text-slate-50 ">
                                            Adresse de résidence
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-slate-50 sm:mt-0 sm:col-span-2">
                                            {client?.adresse}
                                        </dd>
                                    </div>}
                                    {(client?.fichier_residence != null &&  client?.fichier_residence != '') && <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-slate-3000  dark:text-slate-50 ">
                                            Fichier de résidence
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-slate-50 sm:mt-0 sm:col-span-2">
                                            <a target='_blanck' className='text-blue-500' href={HTTP_FRONTEND_HOME + '' + client?.fichier_residence}>Télécharger le fichier</a>
                                        </dd>
                                    </div>}

                                </dl>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </ProfilLayout>
    );
}
