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
        type: SET_LOGIN_PENDING,
        payload: isLoginSuccess
    }
}

function setLoginError(error){
    return {
        type: SET_LOGIN_PENDING,
        payload: error
    }
}

export function loginUser({email, password}){
    
    return (dispatch) =>  {
        console.log(dispatch);
        const data = new FormData();
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(false));
        console.log("HERE");
        return fetch(`${API_URL}/auth/login`,{
            method: "POST",
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: data
        }).then(
            response => {
                
                dispatch(setLoginPending(false));
                dispatch(setLoginSuccess(true));
            },
            error => {
              dispatch(setLoginPending(false));
              dispatch(setLoginError(error));
              throw error
            }
          )
    }
} 
const INITIAL_STATE = {
  isLoggedIn: false,
  pending: false,
  error: false
};
export function loginReducer(state = INITIAL_STATE, action){
    console.log(action);
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