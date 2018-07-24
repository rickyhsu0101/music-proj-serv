import  {SET_PROJECT, SET_MULTIPLE_PROJECTS, SET_MIDIMAP, SET_PROJECT_ID} from '../actions/types';
import isEmpty from '../validation/isEmpty';
const initialState = {
  projects: '',
  project: null,
  midiMap: null,
  projID: null,
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
    case SET_PROJECT_ID:
      return({
        ...state,
        projID: action.payload
      });
    default:
      return state;
  }
}
