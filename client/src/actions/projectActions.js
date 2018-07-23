import axios from 'axios';
import {SET_PROJECT, SET_MULTIPLE_PROJECTS, SET_ERRORS, SET_MIDIMAP} from './types';
export const getProject = (projId) => dispatch => {
  axios.get(`/api/project/${projId}`)
    .then(res => {
      dispatch({
        type: SET_PROJECT,
        payload: res.data
      });
      dispatch({
        type: SET_ERRORS,
        payload: {
          project: null
        }
      });
    })
    .catch(err=>dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    }));
}
export const getAllProjects = ()=> dispatch => {
  axios.get('/api/project/all')
    .then(res=>{
      dispatch({
        type: SET_MULTIPLE_PROJECTS,
        payload: res.data
      });
      dispatch({
        type: SET_ERRORS,
        payload: {
          projects: null
        }
      });
    })
    .catch(err=>dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    }));
}
export const createUpdateProject = (proj)=>dispatch=>{
  axios.post('/api/project', proj)
    .then(res=>{
      dispatch({
        type: SET_PROJECT,
        payload: res.data
      });
      dispatch({
        type: SET_ERRORS,
        payload: {
          midiMap: null,
          projName: null,
          projDesc: null,
          project: null,
          noprofile: false
        }
      })
    })
    .catch(err=>dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    }))
}
export const setMidiMap= (midiMap)=> dispatch=>{
  dispatch({
    type: SET_MIDIMAP,
    payload: midiMap
  });
}