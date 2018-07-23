import  {SET_PROJECT, SET_MULTIPLE_PROJECTS, SET_MIDIMAP} from '../actions/types';
import isEmpty from '../validation/isEmpty';
const initialState = {
  projects: '',
  project: null
};

export default (state = initialState, action)=>{
  switch(action.type){
    case SET_PROJECT:
      return ({
        ...state,
        project: action.payload
      });
    case SET_MULTIPLE_PROJECTS:
      return({
        ...state,
        projects: action.payload
      });
    case SET_MIDIMAP:
      return({
        ...state,
        midiMap: action.payload
      });
    default:
      return state;
  }
}
