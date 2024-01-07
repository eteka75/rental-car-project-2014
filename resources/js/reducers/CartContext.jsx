import { createContext, useContext, useEffect, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.action) {
    case 'ADD_TO_CART':
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
    
      if (existingItem) {
       const updatedCartAdd= state.cartItems.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        localStorage.setItem('cartItems', JSON.stringify(updatedCartAdd));
        return { ...state, cartItems: updatedCartAdd };
      } else {
        const updatedCartAdd = [...state.cartItems, { ...action.payload, quantity: 1 }];
        localStorage.setItem('cartItems', JSON.stringify(updatedCartAdd));
        return { ...state, cartItems: updatedCartAdd };
      }

    case 'REMOVE_FROM_CART':
      const updatedCartRemove = state.cartItems.filter(item => item.id !== action.payload.id);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartRemove));
      return { ...state, cartItems: updatedCartRemove };
    case 'SET_CART_ITEMS':
      return { ...state, cartItems: action.payload };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, { cartItems: [] });
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
        dispatch({ action: 'SET_CART_ITEMS', payload: JSON.parse(storedCartItems) });
      }
    },[]);

    return (
      <CartContext.Provider value={{ cartState, dispatch }}>
        {children}
      </CartContext.Provider>
    );
  };
  

  const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error('useCart doit être utilisé dans un CartProvider');
    }
    return context;
  };

  export { CartProvider, useCart }