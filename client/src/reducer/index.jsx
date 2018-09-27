import { combineReducers } from 'redux';
import authReducer from './auth-reducer.jsx';
import errorReducer from './error-reducer.js';


export default combineReducers({
    auth: authReducer,
    errors: errorReducer
})