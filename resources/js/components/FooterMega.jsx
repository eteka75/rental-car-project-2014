import React from 'react';
import { Link } from '@inertiajs/react';
import { FaXTwitter } from 'react-icons/fa6';
import { FaFacebookSquare } from 'react-icons/fa';
import { usePage } from '@inertiajs/react';



export default function FooterMega() {
    const {info_bas_page,tmarques}=usePage().props;
    return (
        <>
            <div id='footer' className='shadow-lg'>
                <footer className="bg-gray-950   dark:bg-gray-900 bg-gradient-to-b from-gray-800 to-gray-90">
                    <div className="relative overflow-hidden">

                                      
                    <div className="mx-auto z-30  w-full max-w-screen-xl relative">
                        <div className="grid grid-cols-2 gap-8 px-4 pt-6 lg:pt-8 md:grid-cols-3 text-sm">
                        <div className='col-span-2 md:col-span-1'>
                                <h2 className="mb-2 text-sm font-semibold text-yellow-500 uppercase ">Rental Car services</h2>
                               <div className="text-slate-400">
                               <div className='' dangerouslySetInnerHTML={{__html:info_bas_page?.contenu}}>

                               </div>
                               
                               </div>
                               <div className="flex mt-4 pt-4 md:mt-0 space-x-5 rtl:space-x-reverse">
                                <a href="https://twitter.com/?lang=fr" className="text-gray-400 hover:text-gray-50 dark:hover:text-white">
                                   <FaXTwitter className='text-3xl md:text-xl' />
                                    <span className="sr-only">Facebook page</span>
                                </a>
                                <a href="https://facebook.com" className="text-gray-400 hover:text-gray-50 dark:hover:text-white">
                                <FaFacebookSquare className='text-3xl md:text-xl'/> 
                                    <span className="sr-only">Twitter page</span>
                                </a>
                            </div>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-yellow-500 uppercase ">La société</h2>
                                <ul className="text-gray-400  dark:text-gray-400 font-medium">
                                    <li className="mb-4">
                                        <Link href={route('front.apropos')} className="hover:underline hover:text-yellow-500">A propos</Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link href={route('front.services')} className="hover:underline hover:text-yellow-500">Services</Link>
                                    </li>
                                   
                                    <li className="mb-4">
                                        <Link href={route('front.marques')} className="hover:underline hover:text-yellow-500">Les marques disponibles</Link>
                                    </li>
                                    
                                    <li className="mb-4">
                                        <Link href={route('front.locations')} className="hover:underline hover:text-yellow-500">Louer une voiture</Link>
                                    </li>
                                    <li className="">
                                        <Link href={route('front.achats')} className="hover:underline hover:text-yellow-500">Acheter une voiture</Link>
                                    </li>
                                   
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-yellow-500 uppercase ">Centre d'aide</h2>
                                <ul className="text-gray-400  dark:text-gray-400 font-medium">
                                    
                                    <li className="mb-4">
                                        <Link href={route('front.faq')} className="hover:underline hover:text-yellow-500">Forum aux questions</Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link href={route('front.avis')} className="hover:underline hover:text-yellow-500">Avis de nos clients</Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link href={route('front.support')} className="hover:underline hover:text-yellow-500">Support clients</Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link href={route('front.contact')} className="hover:underline hover:text-yellow-500">Nous contacter</Link>
                                    </li>
                                    <li className="">
                                    <Link href={route('front.termes')} className="hover:underline hover:text-yellow-500">Terms &amp; Conditions</Link>

                                    </li>
                                </ul>
                            </div>
                            
                        </div>
                        {tmarques && tmarques?.length>0 ?
                        <div className="pt-2 text-slate-200 justify-center items-center pb-4 border-t mt-6 border-[#47474752] flex flex-wrap gap-4">
                            
                            {tmarques && tmarques?.length>0 && tmarques.map(({nom,id},index)=>(
                                <Link href={route('front.marq_voiture',id)} key={index} className="px-4 text-xs uppercase py-1 text-slate-300 hover:text-yelow-500">
                                   {nom} 
                                </Link>
                            ))}
                        </div>
                        :
                        <div className="p-2"></div>
                        }
                    </div>
                    <div className="relatives sm:flex hidden z-10">
                        <div aria-hidden="true" className="absolute  h-72 z-1 top-0 overflow-hidden  blur-[6px]  bg-slate-200 h-50 w-full bottom-0 opacity-10 dark:opacity-15">
                        <div className="blur-[46px] h-20 bg-gradient-to-b rotate-45 from-blue-900 to-cyan-500"></div>
                            
                            <div className="blur-[46px] h-14 bg-gradient-to-r  from-slate-900 -50 to-gray-900 "></div>
                        </div> 
                      
                    </div> 
                    </div>
                    <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 ">
                        <div className='mx-auto max-w-screen-xl text-center md:flex md:items-center md:justify-center'>
                            <span className="text-xs text-gray-500 dark:text-gray-300  text-center">Copyright © {new Date().getFullYear()} Rental Car Services Bénin. Tous droits réservés.

                            </span>
                            
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}
