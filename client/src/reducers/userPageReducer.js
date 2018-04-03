import { FETCH_USER_PAGE } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER_PAGE:
      return action.payload;
    default:
      return state;
  }
}
