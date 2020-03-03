import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_BOATS = 'GET_BOATS';

const initialState = {};

/**
 * ACTION CREATORS
 */
const getBoats = boats => ({ type: GET_BOATS, boats });

/**
 * THUNK CREATORS
 */
export const fetchBoats = () => async dispatch => {
  try {
    const { data } = await axios.get('/boats/ROUTE/TODO/FIXME');
    dispatch(getBoats(data));
  } catch (err) {
    console.error(err);
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BOATS:
      return action.boats;
    default:
      return state;
  }
}
