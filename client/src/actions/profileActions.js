import {GET_PROFILE,GET_PROFILES,PROFILE_LOADING,GET_ERRORS,CLEAR_CURRENT_PROFILE, SET_CURRENT_USER} from './types';
import errorReducer from '../reducer/error-reducer';
import axios from 'axios';


export const getCurrentProfile = () => dispatch =>{
  dispatch(setProfileLoading());
  axios.get('/api/profile')
       .then(res=>{
         dispatch({
           type:GET_PROFILE,
           payload:res.data
         })
       })
       .catch(err=>{
         dispatch({
           type:GET_PROFILE,
           payload:{}
         })
       })
}

export const getProfileByHandle = (handle) => dispatch => {
  dispatch(setProfileLoading());
  axios.get(`/api/profile/handle/${handle}`)
       .then(res=>{
         console.log('res',res);
         dispatch({
           type:GET_PROFILE,
           payload:res.data
         })
       }).catch(err=>{
         console.log('err',err);
         dispatch({
           type:GET_PROFILE,
           payload:{}
         })
       })
}

export const getProfiles = () => dispatch =>{
  dispatch(setProfileLoading());
  axios.get('/api/profile/all')
       .then(res=>{
         dispatch({
           type:GET_PROFILES,
           payload:res.data
         })
       })
       .catch(err=>{
         dispatch({
           type:GET_PROFILES,
           payload:null
         })
       })
}

//delete account and profile 
export const deleteAccount = () => dispatch => {
  if(window.confirm(`are you sure? this can't be undone`)) {
    axios.delete('/api/profile')
         .then(res=>{
           dispatch({
             type: SET_CURRENT_USER,
             payload: {}
           })
         }).catch(err=>{
           dispatch({
             type:GET_ERRORS,
             payload: err.response.data
           })
         })
  }
}

//add experience
export const addExperience = (experienceData,history) => dispatch => {
  axios.post('/api/profile/experience',experienceData)
       .then(res=>{
         history.push('/dashboard')
       }).catch(err=>{
         dispatch({
           type:GET_ERRORS,
           payload:err.response.data,
         })
       })
}

//delete experience
export const deleteExperience = (id) => dispatch => {
  axios.delete(`/api/profile/experience/${id}`)
       .then(res=>{
         dispatch({
           type:GET_PROFILE,
           payload:res.data,
         })
       }).catch(err=>{
         dispatch({
           type:GET_ERRORS,
           payload:err.response.data,
         })
       })
}

//delete education
export const deleteEducation = (id) => dispatch => {
  axios.delete(`/api/profile/education/${id}`)
       .then(res=>{
         dispatch({
           type:GET_PROFILE,
           payload:res.data,
         })
       }).catch(err=>{
         dispatch({
           type:GET_ERRORS,
           payload:err.response.data,
         })
       })
}

//add education 
export const addEducation = (eduData,history) => dispatch =>{
  axios.post('api/profile/education',eduData)
       .then(res=>{
         history.push('/dashboard');
       }).catch(err=>{
         dispatch({
           type:GET_ERRORS,
           payload:err.response.data,
         })
       })
}
export const createProfile = (profileData,history) => dispatch =>{
   axios.post('api/profile',profileData)
        .then(res=>{
          history.push('/dashboard')
        })
        .catch(err=>{
            dispatch({
              type:GET_ERRORS,
              payload:err.response.data
          })
        }
        )
}

export const setProfileLoading = () =>{
  return {
    type: PROFILE_LOADING
  }
}

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}
