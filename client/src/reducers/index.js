import { combineReducers } from 'redux';

import authReducer from './authReducer';
import counterReducer from './counterReducer';

export default combineReducers({ authReducer, counterReducer });
