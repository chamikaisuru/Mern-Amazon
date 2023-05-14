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
      return {
        ...state,
        Cart: {
          ...state.Cart,
          CartItems: [...state.Cart.CartItems, action.payload],
        },
      };
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
