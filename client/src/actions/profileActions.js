import {GET_PROFILE,GET_PROFILES,PROFILE_LOADING,GET_ERRORS,CLEAR_CURRENT_PROFILE} from './types';
import axios from 'axios';

export const getCurrentProfile = () => dispatch =>{
  dispatch(setProfileLoading());
  axios.get('/api/profile')
       .then(res=>{
         console.log(res.data);
         dispatch({
           type:GET_PROFILE,
           payload:res.data
         })
       })
       .catch(err=>{
         console.log('error is',err);
         dispatch({
           type:GET_PROFILE,
           payload:{}
         })
       })
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