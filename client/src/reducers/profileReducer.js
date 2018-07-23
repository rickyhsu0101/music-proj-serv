import {SET_PROFILE} from '../actions/types';
import isEmpty from '../validation/isEmpty';
const initialState = {
  hasProfile: false,
  profile: {}
};
export default (state = initialState, action)=>{
  switch(action.type){
    case SET_PROFILE:
      return{
        ...state,
        hasProfile: !isEmpty(action.payload),
        profile: action.payload
      };
    default:
      return state;
      
  }
}