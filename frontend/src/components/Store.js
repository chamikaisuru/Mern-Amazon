import { createContext, useReducer } from 'react';

export const Store = createContext();
const InitialState = {
  Cart: {
    CartItems: localStorage.getItem('CartItems')
      ? JSON.parse(localStorage.getItem('CartItems'))
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const newItem = action.payload;
      const existItem = state.Cart.CartItems.find(
        (item) => item._id === newItem._id
      );
      const CartItems = existItem
        ? state.Cart.CartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.Cart.CartItems, newItem];
      localStorage.setItem('CartItems', JSON.stringify(CartItems));
      return { ...state, Cart: { ...state.Cart, CartItems } };
    case 'REMOVE_FROM_CART':
      const updatedItems = state.Cart.CartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('CartItems', JSON.stringify(updatedItems));
      return { ...state, Cart: { ...state.Cart, CartItems: updatedItems } };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, InitialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
