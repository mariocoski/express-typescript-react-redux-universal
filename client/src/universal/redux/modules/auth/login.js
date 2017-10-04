import fetch from 'isomorphic-fetch';
import {API_URL, JWT_TOKEN} from '../../../constants';
const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
import { SubmissionError } from 'redux-form';
import {toastr} from 'react-redux-toastr'

// function makeAuthenticatedRequest(url, opts) {
//   opts.headers = opts.headers || {};
//   opts.header.Authorization = "jwt_token";
//   return fetch(url, opts);
// }

export function setLoginPending(isLoginPending){
    return {
        type: SET_LOGIN_PENDING,
        payload: isLoginPending
    }
}

export function setLoginSuccess(isLoginSuccess){
    return {
        type: SET_LOGIN_SUCCESS,
        payload: isLoginSuccess
    }
}

export function setLoginError(error){
    return {
        type: SET_LOGIN_PENDING,
        payload: error
    }
}

export function loginUser(history,{email, password}){
    return dispatch =>  {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(false));
        return fetch(`${API_URL}/auth/login`,{
            method: "POST",
            redirect: 'follow',
            body: JSON.stringify({ email, password }),
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
        })
        .then(response => (response.json()))
        .then(response => {
            console.log("here",response.status);
            localStorage.setItem(JWT_TOKEN, response.token);
            dispatch(setLoginPending(false));
            dispatch(setLoginSuccess(true));
            history.push('/dashboard');
        }).catch(error => {
            console.log("here",error);
            toastr.error(error.message);
            throw new SubmissionError({
                _error: error.message,
              });
            console.log(error);
        });
    }
} 

export function meFromToken(token){
    return dispatch => {
        return new Promise((resolve,reject)=>{
            fetch(`${API_URL}/auth/me-from-token`,{
                method: "POST",
                headers: {
                  'authorization': `Bearer ${token}`
                }
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        });
    }
}

export function logoutUser(history){
    return (dispatch) =>  {
        dispatch(setLoginSuccess(false));
        localStorage.removeItem(JWT_TOKEN);
        history.push('/login');
    }
} 
const INITIAL_STATE = {
  isLoggedIn: false,
  pending: false,
  error: false
};

export function loginReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case SET_LOGIN_ERROR:
          return {...state, pending: action.payload}
        case SET_LOGIN_SUCCESS:
          return {...state, isLoggedIn: action.payload}
        case SET_LOGIN_ERROR:
          return {...state, error: action.payload}
    }
    return state;
}