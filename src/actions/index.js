import axios from 'axios';
import {browserHistory} from 'react-router';
import {AUTH_USER,DEAUTH_USER,AUTH_ERROR} from './types';

const ROOT_URL = `http://${window.location.hostname}:3090`;

export function signinUser({name, password}) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, {name, password})
    .then(response => {
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/game');
    })
    .catch(error => {
      dispatch(authError('Bad Login Info'));
    });
  }
}

export function signupUser({name, password}) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, {name, password})
    .then(response => {
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/game');
    })
    .catch(error => {
      console.log(error);
      dispatch(authError(error.response.data.error));
    });
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
  return {type:DEAUTH_USER};
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}
