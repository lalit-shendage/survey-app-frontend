// src/redux/actions/authActions.js
import api, { setAuthToken } from '../../services/api';

// Action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOGOUT = 'LOGOUT';

// Action creators
export const login = (userData) => async (dispatch) => {
  try {
    console.log("trying to login")
    const response = await api.post('/auth/login', userData);
    const { token } = response.data;

    // Handle successful login
    localStorage.setItem('token', token);
    setAuthToken(token);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
  } catch (error) {
    // Handle login error
    dispatch({ type: LOGIN_FAIL });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    const response = await api.post('/auth/register', userData);
    const { token } = response.data;

    // Handle successful registration
    localStorage.setItem('token', token);
    setAuthToken(token);
    dispatch({ type: REGISTER_SUCCESS, payload: response.data.user });
  } catch (error) {
    // Handle registration error
    dispatch({ type: REGISTER_FAIL });
  }
};

export const logout = () => (dispatch) => {
  // Handle logout (clear local storage, remove token from headers, dispatch logout action)
  localStorage.removeItem('token');
  setAuthToken(null);
  dispatch({ type: LOGOUT });
};
