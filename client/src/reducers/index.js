import { combineReducers } from 'redux';

import authReducer from './authReducer';
import counterReducer from './counterReducer';
import activitiesReducer from './activitiesReducer';
import userPageReducer from './userPageReducer';

export default combineReducers({
  authReducer,
  counterReducer,
  activities: activitiesReducer,
  userPage: userPageReducer,
});
