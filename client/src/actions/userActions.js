import axios from 'axios';
import { LOGOUT, FETCH_USER } from './types';

// export const logout = () => {
//   return dispatch => {
//     axios.get('/api/logout').then(() => dispatch({ type: LOGOUT }));
//   };
// };

export const logout = () => async dispatch => {
  const res = await axios.get('/api/logout');
  const resData = res.data;
  dispatch({ type: LOGOUT, resData });
};

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  const resData = res.data;
  dispatch({ type: FETCH_USER, resData });
};
