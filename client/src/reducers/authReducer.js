import * as actions from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case actions.FETCH_USER:
      return action.resData || false;
    default:
      return state;
  }
}
