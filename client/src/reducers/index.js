import { combineReducers } from 'redux';

import authReducer from './authReducer';
import counterReducer from './counterReducer';
import activitiesReducer from './activitiesReducer';

export default combineReducers({
  authReducer,
  counterReducer,
  activities: activitiesReducer,
});
