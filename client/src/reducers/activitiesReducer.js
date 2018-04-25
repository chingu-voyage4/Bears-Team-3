import { FETCH_ACTIVITIES, CLEAR_ACTIVITIES } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_ACTIVITIES:
      return action.payload;
    case CLEAR_ACTIVITIES:
      return null;
    default:
      return state;
  }
}
