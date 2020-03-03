import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_BOATS = 'GET_BOATS';
const GET_SINGLE_BOAT = 'GET_SINGLE_BOAT';

const initialState = {};

/**
 * ACTION CREATORS
 */
const getBoats = boats => ({ type: GET_BOATS, boats });
const gotSingleBoat = boat => ({
  type: GET_SINGLE_BOAT,
  boat,
});

/**
 * THUNK CREATORS
 */
export const fetchBoats = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/boats');
    dispatch(getBoats(data));
  } catch (err) {
    console.error(err);
  }
};

export const getSingleBoat = id => async dispatch => {
  try {
    const { data } = await axios.get(`/api/boats/${id}`);
    dispatch(gotSingleBoat(data));
  } catch (error) {
    console.error(error);
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
