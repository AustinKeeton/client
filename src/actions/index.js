import axios                                                 from 'axios';
import { browserHistory }                                    from 'react-router';
import { AUTH_ERROR, AUTH_USER, FETCH_MESSAGE, UNAUTH_USER } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  return function (dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // if good...
        // update state to indicate auth
        dispatch({ type: AUTH_USER });
        
        // save JWT token to make auth'd req
        localStorage.setItem('token', response.data.token);
        
        // redirect to /feature
        browserHistory.push('/feature');
      })
      .catch(() => {
        // if bad...
        // show error on signin page
        dispatch(authError('Bad Login Info'));
      });
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  };
}

export function signupUser({ email, password }) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch((error) => {
        dispatch(authError(error.response.data.error));
      });
  };
}

export function fetchMessage() {
  return function (dispatch) {
    axios.get(`${ROOT_URL}`, {
        headers: { authorization: localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  };
}