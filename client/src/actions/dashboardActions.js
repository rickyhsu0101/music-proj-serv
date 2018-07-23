import axios from 'axios';
import {SET_PROFILE, GET_ERRORS, GET_PROFILE_ERRORS} from './types';

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
export const createUpdateProfile = (profileData, history)=>dispatch=>{
  axios.post('/api/profile', profileData)
    .then(res=>{
      dispatch({
        type: SET_PROFILE,
        payload: res.data
      });
      dispatch({
        type: GET_PROFILE_ERRORS,
        payload: {noprofile: null, handle: null, bio: null}
      });
      history.push("/dashboard");
    })
    .catch(err=>
      dispatch({
        type: GET_PROFILE_ERRORS,
        payload: err.response.data
      })
    );
}