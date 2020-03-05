import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const UPDATE_CART = 'UPDATE_CART';
/**
 * INITIAL STATE
 */
const defaultCart = { status: 'PENDING', boats: [] };

/**
 * ACTION CREATORS
 */
const getCart = cart => ({ type: GET_CART, cart });
export const updateCart = boat => ({ type: UPDATE_CART, boat });

/**
 * THUNK CREATORS
 */
export const cart = user => async dispatch => {
  let cart;

  try {
    // switch to session storage
    if (window.localStorage.getItem('cart')) {
      console.log(
        'grabbing cart from window local storage',
        window.localStorage.getItem('cart')
      );
      cart = JSON.parse(window.localStorage.getItem('cart'));
    } else if (!user.length) {
      // guest

      let res = await axios.post('/api/orders'); // object

      cart = res.data;

      console.log('getting new cart template from database', cart);
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
    case UPDATE_CART:
      return { ...state, boats: [...state.boats, action.boat] };
    default:
      return state;
  }
}
