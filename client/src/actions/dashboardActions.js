import axios from 'axios';
import {SET_PROFILE, GET_ERRORS} from './types';

export const searchOwnProfile = ()=>dispatch=>{
  axios.get('/api/profile')
    .then(res=>{
      dispatch({
        type: SET_PROFILE,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    })
    .catch(err=>{
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
}