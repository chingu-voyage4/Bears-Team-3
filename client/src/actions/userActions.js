import axios from 'axios';
import { LOGOUT, FETCH_USER, FETCH_USER_PAGE } from './types';

// export const logout = () => {
//   return dispatch => {
//     axios.get('/api/logout').then(() => dispatch({ type: LOGOUT }));
//   };
// };

export const logout = () => async dispatch => {
  await axios.get('/api/logout');
  return dispatch({ type: LOGOUT });
};

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  const resData = res.data;
  dispatch({ type: FETCH_USER, resData });
};

export const fetchUserInfo = username => async dispatch => {
  const res = await axios.get(`/api/user/${username}`);
  dispatch({ type: FETCH_USER_PAGE, payload: res.data });
};
