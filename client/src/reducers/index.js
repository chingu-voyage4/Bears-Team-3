import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import activitiesReducer from './activitiesReducer';
import userPageReducer from './userPageReducer';

export default combineReducers({
  authReducer,
  activities: activitiesReducer,
  userPage: userPageReducer,
  form: formReducer,
});
