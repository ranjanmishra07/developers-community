import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken'
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const registerUser = (userData, history) => dispatch => {

    axios.post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

export const loginUser = (userData, history) => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            //save  to localstorage
            const { token } = res.data;
            console.log(token);
            //set token to ls 
            localStorage.setItem('jwtToken', token);
            //set token to authheader
            setAuthToken(token);
            const decoded = jwt_decode(token);
            //set current user
            dispatch(setCurrentUser(decoded));

        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}