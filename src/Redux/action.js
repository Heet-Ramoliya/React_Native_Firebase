import {ADD_TO_CART, REMOVE_FROM_CART} from './Constants';

export const addToCart = item => {
  return {
    type: ADD_TO_CART,
    data: item,
  };
};

export const removeFromCart = item => {
  return {
    type: REMOVE_FROM_CART,
    data: item,
  };
};
