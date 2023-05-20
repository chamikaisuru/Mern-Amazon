import { createContext, useReducer } from 'react';

export const Store = createContext();
const InitialState = {
  Cart: {
    CartItems: [],
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
      return { ...state, Cart: { ...state.Cart, CartItems } };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, InitialState);
  const value = { state, dispatch };
  console.log('value', value);
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
