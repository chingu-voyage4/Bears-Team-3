import * as actions from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case actions.FETCH_USER:
      return action.resData || false;
    case actions.LOGOUT:
      return {};
    case actions.DELETE_USER_SUCCESS:
      return {};
    case actions.DELETE_USER_FAILURE:
      return { ...state, error: 'Error deleting account, try again.' };
    default:
      return state;
  }
}
