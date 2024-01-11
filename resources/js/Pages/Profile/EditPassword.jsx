import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import DashHeadTitle from '@/components/dashboard/DashHeadTitle';
import ProfilLayout from '@/Layouts/ProfilLayout';

export default function EditPassword({ auth, mustVerifyEmail, status }) {
    return (
        <ProfilLayout
            user={auth.user} auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Mon compte</h2>}
        >
            <div className="py-6">
            <Head title={auth.user.prenom +" "+auth.user.nom +" | Profile "} />
            <DashHeadTitle title={"Modifier mon mot de passe"} subtitle={"Consultez et modifiez mon profil"}/>
                <div className=" space-y-6">
                    
                
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                </div>
            </div>
        </ProfilLayout>
    );
}
