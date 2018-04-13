import axios from 'axios';
import {
  ADD_PROGRESS,
  FETCH_PROGRESS,
  MODIFY_PROGRESS,
  DELETE_PROGRESS,
} from './types';

export const clearProgressData = () => dispatch => {
  dispatch({ type: DELETE_PROGRESS });
};

export const fetchProgressData = id => async dispatch => {
  const res = await axios.get(`/api/progress/${id}`);
  dispatch({ type: FETCH_PROGRESS, payload: res.data });
};

export const addProgressData = values => async dispatch => {
  const res = await axios.post('/api/progress/new', values);
  dispatch({ type: ADD_PROGRESS, payload: res.data });
};

export const modifyProgressData = values => async dispatch => {
  const res = await axios.patch('/api/progress', values);
  dispatch({ type: MODIFY_PROGRESS, payload: res.data });
};

export const deleteProgressData = () => async dispatch => {
  const res = await axios.delete('/api/progress');
  dispatch({ type: DELETE_PROGRESS });
};