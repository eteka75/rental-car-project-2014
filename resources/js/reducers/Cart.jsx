import React from 'react';
import { useCart } from './CartContext';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { Badge, Button, Tooltip } from '@material-tailwind/react';
import { FaRegTrashCan } from 'react-icons/fa6';
import { formaterMontant } from '@/tools/utils';
import i18n from '@/i18n';
import { useTranslation } from 'react-i18next';
import { Link } from '@inertiajs/react';
import default_photo1 from "@/assets/images/design/default_voiture.jpg";
import { FaCartPlus } from 'react-icons/fa';
import { handleOpenCart } from '@/components/locations/LocaVoitureCard';
import { BsCart4 } from 'react-icons/bs';


const Cart = () => {
    const { cartState } = useCart();
    const handleRemoveFromCart = (item) => {
        dispatch({ action: 'REMOVE_FROM_CART', payload: item, cat: "Achat" });
    };
    const { dispatch } = useCart();
    const { t } = useTranslation();
    return (
        <div>
            {cartState?.cartItems?.length>0 &&
            <div>
                {  cartState?.cartItems?.map(({ id, name, quantity, photo, prix }) => (
                    <div key={id} className="p-2 border mb-2 justify-between rounded-md  gap-2">
                       <div className="flex justify-between">
                       <div className='font-bold text-lg mb-1'>
                                    <Link href={route('front.achat', id)}>
                                        {name ?? '-'}
                                    </Link>
                                </div>
                                <div>
                            <Tooltip placement="top-start" content={t('Supprimer')}>

                                <Button size='sm' onClick={() => handleRemoveFromCart({ id: id, name: name, photo: photo, prix: prix })} variant='text'><FaRegTrashCan /> </Button>
                            </Tooltip>
                        </div>
                       </div>
                        <div className="flex gap-2 mb-1"> 
                        <div>
                            {photo != null && photo != '' ?
                                <Link href={route('front.achat', id)}><img src={HTTP_FRONTEND_HOME + '' + photo}
                                    className='h-14  object-center object-cover rounded-md'
                                    alt={name} />
                                </Link>
                                : <Link href={route('front.achat', id)}><img src={default_photo1}
                                    className='h-14  object-center object-cover rounded-md'
                                    alt={name} />
                                </Link>
                            }
                        </div>
                            <div >
                               

                                <div className='text-sm font-medium text-yellow-600'>{formaterMontant(prix, i18n.language)} </div>
                                <div className="flex flex-wrap">
                                    <div className='text-sm pe-4 '>Quantité  : <span className='text-center leading-4 px-1.5 bg-gray-800 text-white rounded-full'>{quantity ?? 1}</span>

                                    </div>
                                </div>

                            </div>
                        </div>
                       
                    </div>
                ))               
                }
                <div>
                    <Button className='w-full mt-2 text-yellow-500'>Commander</Button>
                </div>
                </div>}
                {(!cartState?.cartItems?.length ) && 
                <div className='p-4 border rounded-md shadow-sm text-center'>
                    <BsCart4 className='text-5xl text-slate-300 mb-4 mx-auto'/>
                  <h2 className='text-lg'>  {t('Panier vide !')}</h2>
                  <p className="text-sm text-slate-500">{t('Les voitures ajoutées à votre panier apparaissent ici')}</p>

                </div>
                }
        </div>
    );
};
function CartCounter() {
    const { cartState } = useCart();
    let nb = cartState?.cartItems?.length ?? 0;
    nb = nb > 9 ? '9+' : nb;
    return nb;
}
function AddCartBtn({ id, nom, photo, prix }) {
    const { dispatch } = useCart();

    const handleAddToCart = (product) => {
        handleOpenCart();
        dispatch({ action: 'ADD_TO_CART', payload: product, cat:"Achat" });
    }; 
    return <Button  
    onClick={() => handleAddToCart({ id: id, name: nom, photo: photo, prix: prix })} 
    className="w-fulls bg-gray-800  border py-3 px-4 flex  gap-2 hover hover:bg-gray-900 hover:text-white
     text--500 shadow-none" >
        <FaCartPlus className='text-yellow-500'/> <span className="md:flex hidden text-yellow-500">Ajouter au panier</span>
    </Button>
}
export {
    Cart, CartCounter, AddCartBtn, 
};