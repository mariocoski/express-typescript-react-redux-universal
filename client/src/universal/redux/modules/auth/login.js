import fetch from 'isomorphic-fetch';
import {API_URL} from '../../../constants';
const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';

function setLoginPending(isLoginPending){
    return {
        type: SET_LOGIN_PENDING,
        payload: isLoginPending
    }
}

function setLoginSuccess(isLoginSuccess){
    return {
        type: SET_LOGIN_SUCCESS,
        payload: isLoginSuccess
    }
}

function setLoginError(error){
    return {
        type: SET_LOGIN_PENDING,
        payload: error
    }
}

export function loginUser(history,{email, password}){
   
    return (dispatch) =>  {

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
        }).then(response => (response.json())).then(response => {
            console.log("mam",response);
            dispatch(setLoginPending(false));
            dispatch(setLoginSuccess(true));
            //@todo save token
            history.push('/dashboard');
        }).catch(error => {
            console.log(error);
        });
    }
} 

export function logoutUser(history){
   console.log("what is ",history);
    return (dispatch) =>  {
        dispatch(setLoginSuccess(false));
        //@todo delete token
        history.push('/dashboard');
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