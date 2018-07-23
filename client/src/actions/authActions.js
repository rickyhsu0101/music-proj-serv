//REgister User
import {GET_ERRORS, SET_CURRENT_USER} from './types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../util/setAuthToken';
export const registerUser = (userData, history)=>dispatch =>{
    axios.post('/api/users/register', userData)
      .then(res=> {
        history.push('/login');
        dispatch({
          type: GET_ERRORS,
          payload: {name: null, email: null, password: null, password2: null}
        });
      })
      .catch(err=>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
}
export const loginUser = (userData, history)=>dispatch => {
  axios.post('/api/users/login', userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      //set token to auth header
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch({
        type: GET_ERRORS,
        payload: {name: null, email: null, password: null}
      });
      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
      });
      history.push("/profile");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}
export const setCurrentUser = (decoded)=>{
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}
export const logoutUser = ()=>dispatch=>{
  localStorage.removeItem('jwtToken');
  //remove auth header for future request
  setAuthToken(false);
  dispatch(setCurrentUser({}));
}