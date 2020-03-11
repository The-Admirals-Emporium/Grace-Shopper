import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_USER_ORDERS = 'GET_USER_ORDERS';
const GET_ORDERS = 'GET_ORDERS';

/**
 * ACTION CREATORS
 */

const getOrders = orders => ({
  type: GET_ORDERS,
  orders,
});
const getUserOrders = userOrders => ({
  type: GET_USER_ORDERS,
  userOrders,
});
/**
 * THUNK CREATORS
 */

export const getAllOrders = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/orders');
    dispatch(getOrders(data));
  } catch (error) {
    console.error(error);
  }
};

// route set up?
export const getAllUserOrders = userId => async dispatch => {
  try {
    const { data } = await axios.get('/api/orders');
    dispatch(getUserOrders(data));
  } catch (error) {
    console.error(error);
  }
};

/**
 * REDUCERS
 **/

export const userOrders = (userOrders = [], action) => {
  switch (action.type) {
    case GET_USER_ORDERS:
      return action.userOrders;
    default:
      return userOrders;
  }
};

const orders = (orders = [], action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    default:
      return orders;
  }
};

export default orders;
