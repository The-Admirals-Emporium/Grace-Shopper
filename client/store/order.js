import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const GET_USER_CART = 'GET_USER_CART';
const UPDATE_CART = 'UPDATE_CART';
const UPDATE_USER_CART = 'UPDATE_USER_CART';
/**
 * INITIAL STATE
 */
const defaultCart = { status: 'PENDING', boats: [] };

/**
 * ACTION CREATORS
 */
const getCart = cart => ({ type: GET_CART, cart });
const getUserCart = cart => ({ type: GET_USER_CART, cart });
export const updateCart = boat => ({ type: UPDATE_CART, boat });
export const updateUserCart = updatedUserOrder => ({
  type: UPDATE_USER_CART,
  updatedUserOrder,
});

/**
 * THUNK CREATORS
 */
export const guestCart = () => async dispatch => {
  let cart;
  try {
    if (window.localStorage.getItem('cart')) {
      console.log(
        'grabbing cart from window local storage',
        window.localStorage.getItem('cart')
      );
      cart = JSON.parse(window.localStorage.getItem('cart'));
    } else {
      // guest

      let res = await axios.post('/api/orders'); // creates a new cart

      cart = res.data;

      console.log('getting new cart template from database', cart);
      window.localStorage.setItem('cart', JSON.stringify(cart));
    }
    dispatch(getCart(cart));
  } catch (err) {
    console.error(err);
  }
};

export const userCart = user => async dispatch => {
  let cart;
  try {
    let existingCart = await axios.get(`/api/users/${user.id}`);

    if (existingCart.data) {
      cart = existingCart.data;
    } else {
      let newCart = await axios.post('/api/orders'); // creates a new cart

      cart = newCart.data;
    }
    dispatch(getUserCart(cart));
  } catch (err) {
    console.error(err);
  }
};

// TKTK rename thunks and action creators
export const getUpdatedUserCart = (userId, orderId, boat) => async dispatch => {
  try {
    let updatedCart = await axios.put(
      `/api/orders/${userId}/${orderId}/addBoat`,
      boat
    );

    dispatch(updateUserCart(updatedCart.data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */

// reducer for user cart
// TKTK combine into one reducer
export const userOrder = (userOrderState = defaultCart, action) => {
  switch (action.type) {
    case GET_USER_CART:
      return action.cart;
    case UPDATE_USER_CART:
      return {
        // replace with fresh copy of order
        ...action.updatedUserOrder,
      };
    default:
      return userOrderState;
  }
};

// reducer for guest cart
const guestOrder = (orderState = defaultCart, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case UPDATE_CART: {
      const hasBoat = orderState.boats.filter(
        boat => boat.id === action.boat.id
      )[0];

      let updatedBoats;
      if (hasBoat) {
        hasBoat.order_boats.quantity =
          hasBoat.order_boats.quantity + action.boat.order_boats.quantity;
        updatedBoats = [...orderState.boats];
      } else {
        updatedBoats = [...orderState.boats, action.boat];
      }

      return { ...orderState, boats: updatedBoats };
    }
    default:
      return orderState;
  }
};

export default guestOrder;
