import { combineReducers } from 'redux';

import authReducer from './authReducer';

import activitiesReducer from './activitiesReducer';
import userPageReducer from './userPageReducer';

export default combineReducers({
  authReducer,
  activities: activitiesReducer,
  userPage: userPageReducer,
});
