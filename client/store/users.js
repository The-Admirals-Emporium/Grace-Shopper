import axios from 'axios';
import history from '../history';
import { combineReducers } from 'redux';

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS';

/**
 * ACTION CREATORS
 */

const getUsers = users => ({
  type: GET_USERS,
  users,
});

/**
 * THUNK CREATORS
 */

export const getAllUsers = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/users');
    dispatch(getUsers(data));
  } catch (error) {
    console.error(error);
  }
};

export default function(users = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    default:
      return users;
  }
}
