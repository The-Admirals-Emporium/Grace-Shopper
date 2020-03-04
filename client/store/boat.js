import axios from 'axios';
import history from '../history';
import { combineReducers } from 'redux';

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
export const getAllBoats = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/boats');
    dispatch(getBoats(data));
  } catch (err) {
    console.error(err);
  }
};

export const getSingleBoat = id => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/boats/${id}`);
      dispatch(gotSingleBoat(data));
    } catch (err) {
      console.error(err);
    }
  };
};

/**
 * REDUCER
 */
function allBoatsReducer(boats = [], action) {
  switch (action.type) {
    case GET_BOATS:
      return action.boats;
    default:
      return boats;
  }
}

function singleBoatReducer(boat = {}, action) {
  switch (action.type) {
    case GET_SINGLE_BOAT:
      return action.boat;
    default:
      return boat;
  }
}

const rootReducer = combineReducers({
  allBoats: allBoatsReducer,
  singleBoat: singleBoatReducer,
});

export default rootReducer;
