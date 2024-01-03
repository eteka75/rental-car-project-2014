import DashboardLayout from '@/Layouts/DashboardLayout';
import DashHeadTitle from '@/components/dashboard/DashHeadTitle';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    AiOutlineArrowLeft,
    AiOutlineDelete,
    AiOutlinePlus
} from 'react-icons/ai';

import Breadcrumb from '@/components/Breadcrumb';
import Translate from '@/components/Translate';
import DeleteDialog from '@/components/dashboard/DeleteDialog';
import SearchBar from '@/components/dashboard/SearchBar';
import ViewTable from '@/components/dashboard/ViewTable';
import { DateToFront, truncateString } from '@/tools/utils';
import { Inertia } from '@inertiajs/inertia';
import {
    Button,
    Card,
    CardBody,
    IconButton,
    Typography
} from "@material-tailwind/react";
import { useTranslation } from 'react-i18next';
import { CiInboxIn } from "react-icons/ci";
import { FaRegEdit } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa6';


export default function Index({ auth, infos, page_id, 
    page_subid, page_title, page_subtitle, search_text = '',count }) {

    const TABLE_HEAD = ["Titre",  "Date d'ajout", "Actions"];
    const { data, get, errors, processing, setData } = useForm({
        search: '',
    });

    const [datas, setDatas] = useState([]);
    const [showHead, setShowHead] = useState(true);
    const [showSupDialog, setSupDialog] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    useEffect(() => {
        if (infos.data && infos.data.length > 0) {
            setDatas(infos.data);
        }
        
        if (infos.data && infos.data.length > 0) {
            setShowHead(true);
        }else{setShowHead(false);}

        if (search_text !== '') {
            setData('search', search_text);
        }
        console.log(search_text);
    }, []);

    const CloseDialog = () => {
        setSupDialog(false);
        setDeleteId('');
    }

    const SubmitDeletion = () => {
        if (setDeleteId != '') {
            Inertia.delete(route('dashboard.infos.delete', deleteId));
            setDeleteId('')
            setSupDialog(false);
        } else {
            ReloadPage();
        }
    }

    const handleDelete = (id) => {
        setDeleteId(id);
        setSupDialog(true);
    }
    const ReloadPage = () => {
        const url = window.location.href;
        router.visit(url);
    }
    const handleSearch = (e) => {
        setData('search', e.target.value);
    }
    const Search = (e) => {
        e.preventDefault();
        if (data.search !== '') {
            get(route('dashboard.infos.search'),
                {
                    onSuccess: (response) => {
                        setDatas(response.data);
                    },
                    onError: (error) => {
                        console.log(error);
                    },
                });
        }

    }
  const { t, i18n } = useTranslation();

    return (
        <DashboardLayout auth={auth} page_id={page_id} page_subid={page_subid}>
            <Head title={page_title} />
            <Breadcrumb>
                <Link href='#'>
                    <Translate>Informations</Translate>
                </Link>
            </Breadcrumb>
            <DashHeadTitle title={page_title} subtitle={page_subtitle} >
                <Link className='inline-flex whitespace-nowrap items-center text-sm sm:text-md px-5 py-2 text-white bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 rounded-md md:ml-6 md:mb-3'
                    href={route('dashboard.infos.create')}>
                    <AiOutlinePlus className='me-1' />   <Translate>Nouveau</Translate>
                </Link>
            </DashHeadTitle>
            <DeleteDialog showFunction={showSupDialog} closeFunction={CloseDialog} submitFunction={SubmitDeletion} />
            <Card className="h-full w-full">
                <SearchBar
                    exportUrl={route('dashboard.infos.export')}
                    message={errors.search}
                    onSubmit={Search}
                    disabled={processing}
                    searchText={data.search ?? ''}
                    onChange={handleSearch}
                    placeholder={t('Rechercher')+'...'}
                />
                <CardBody className={" p-0 overflow-auto"}>
                    <ViewTable count={count}  head={TABLE_HEAD} links={infos.links} showHead={showHead}>
                        {datas.length > 0 && datas.map(
                            ({ id,   titre,code, created_at }, index) => {
                                const isLast = index === datas.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50 ";

                                return (
                                    <tr className='hover:bg-gray-100 transition-all duration-500' key={id}>
                                    
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold"
                                                >
                                                    <Link href={route('dashboard.infos.show', id)}>
                                                        {truncateString (titre,100)??''}
                                                    </Link>
                                                </Typography>
                                            </div>
                                        
                                            <div className="flex text-slate-500 flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold"
                                                >
                                                    <Link title={titre} href={route('dashboard.infos.show', id)}>
                                                        {code??''}
                                                    </Link>
                                                </Typography>
                                            </div>
                                        </td>
                                        
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >

                                                {DateToFront(created_at, i18n.language)}

                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="md:flex grid-cols-1 grid md:grid-cols-3 gap-1">
                                                <IconButton title='Modifier' variant="text" className=' text-blue-500'>
                                                    <Link className='flex gap-1 cursor-pointer items-center' href={route('dashboard.infos.edit', id)}>
                                                        <FaRegEdit className='h-6 w-4 text-gray-700' />
                                                        <span className="md:hidden"><Translate>Modifier</Translate></span>
                                                    </Link>
                                                </IconButton>
                                                <IconButton title='Voir' variant="text" className=' text-blue-500'>
                                                    <Link className='flex gap-1 cursor-pointer items-center' href={route('dashboard.infos.show', id)}>
                                                        <FaEye className='h-6 w-4 text-gray-700' />
                                                        <span className="md:hidden"><Translate>Voir</Translate></span>
                                                    </Link>
                                                </IconButton>
                                               {/* <IconButton variant='text' className='text-red-600 items-center flex gap-1' title="supprimer cet enrégistrement"
                                                    method="delete"
                                                    href={route('dashboard.infos.delete', id)}
                                                    as="button"
                                                    onClick={() => handleDelete(id)}
                                                >

                                                    <AiOutlineDelete className='h-6 w-4' />
                                                    <span className="md:hidden">Supprimer</span>
                                                </IconButton>*/}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                        {(datas.length === 0 || (data.search != null && search_text != null)) &&
                            <tr><td className="p-4 border-t border-blue-gray-50" colSpan={TABLE_HEAD.length}>
                                <div className='text-center text-gray-600 py-10'>
                                    {datas.length === 0 &&
                                        <>
                                            <CiInboxIn className="text-5xl  mx-auto  text-slate-400" />
                                            <div className="text-sm mb-4 mt-2"><Translate>Aucun enrégistrement</Translate> !</div>
                                        </>
                                    }
                                    {(data.search != null && search_text != null) && <Link href={route('dashboard.infos')}>
                                        <Button className='clear-both max-auto px-6  py-2 bg-transparent font-bold flex items-center mx-auto text-gray-800 border shadow-sm  rounded-md'><AiOutlineArrowLeft className='me-1' />
                                            <Translate>Retour </Translate>
                                        </Button>
                                    </Link>}

                                </div>
                            </td>
                            </tr>
                        }
                    </ViewTable>
                </CardBody>
            </Card>
        </DashboardLayout>
    )
}
