import React, { createContext, useContext, useReducer } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const calculateTotals = (items) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const discountedPrice = item.price - (item.price * item.discountPercentage / 100);
    return sum + (discountedPrice * item.quantity);
  }, 0);
  
  return { totalItems, totalPrice };
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        if (existingItem.quantity >= existingItem.stock) {
          toast.warning('Cannot add more items. Stock limit reached!');
          return state;
        }
        
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        
        const totals = calculateTotals(updatedItems);
        toast.success('Item quantity updated in cart!');
        
        return {
          ...state,
          items: updatedItems,
          ...totals,
        };
      } else {
        const newItem = { ...action.payload, quantity: 1 };
        const updatedItems = [...state.items, newItem];
        const totals = calculateTotals(updatedItems);
        
        toast.success('Item added to cart!');
        
        return {
          ...state,
          items: updatedItems,
          ...totals,
        };
      }
    }
    
    case 'REMOVE_FROM_CART': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      const totals = calculateTotals(updatedItems);
      
      toast.info('Item removed from cart!');
      
      return {
        ...state,
        items: updatedItems,
        ...totals,
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: id });
      }
      
      const updatedItems = state.items.map(item => {
        if (item.id === id) {
          if (quantity > item.stock) {
            toast.warning('Cannot exceed stock limit!');
            return item;
          }
          return { ...item, quantity };
        }
        return item;
      });
      
      const totals = calculateTotals(updatedItems);
      
      return {
        ...state,
        items: updatedItems,
        ...totals,
      };
    }
    
    case 'CLEAR_CART':
      toast.info('Cart cleared!');
      return initialState;
    
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };
  
  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };
  
  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const getItemQuantity = (productId) => {
    const item = state.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };
  
  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};