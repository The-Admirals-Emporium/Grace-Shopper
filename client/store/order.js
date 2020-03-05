import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';

/**
 * INITIAL STATE
 */
const defaultCart = { status: 'PENDING', boats: [] };

/**
 * ACTION CREATORS
 */
const getCart = cart => ({ type: GET_CART, cart });

/**
 * THUNK CREATORS
 */
export const cart = user => async dispatch => {
  let cart;
  console.log('window local storage is', window.localStorage.getItem('cart'));
  try {
    // switch to session storage
    if (window.localStorage.getItem('cart')) {
      cart = JSON.parse(window.localStorage.getItem('cart'));
    } else if (!user.length) {
      // guest
      cart = defaultCart; // object
      window.localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      // user, load from database
    }
    dispatch(getCart(cart));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  console.log(
    'cart reducer received action',
    action,
    'with state',
    defaultCart
  );
  switch (action.type) {
    case GET_CART:
      return action.cart;
    default:
      return state;
  }
}
