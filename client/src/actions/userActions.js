import axios from 'axios';
import { LOGOUT, FETCH_USER } from './types';

export const logout = () => async dispatch => {
  await axios.get('/api/logout');
  dispatch({ type: LOGOUT });
};

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  const resData = res.data;
  dispatch({ type: FETCH_USER, resData });
};
