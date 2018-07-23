import {GET_ERRORS, GET_PROFILE_ERRORS, SET_ERRORS} from '../actions/types';
const initialState = {
  
};
export default function(state = initialState, action){
  switch(action.type){
    case GET_ERRORS:
      return action.payload;
    case GET_PROFILE_ERRORS:
      return ({
        ...state,
        ...action.payload
      });
    case SET_ERRORS:
      return({
        ...state,
        ...action.payload
      });
    default:
      return state;
  }
}