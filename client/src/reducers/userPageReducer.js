import {
  FETCH_USER_PAGE,
  ADD_PROGRESS,
  FETCH_PROGRESS,
  MODIFY_PROGRESS,
} from '../actions/types';

const INITIAL_STATE = {
  activities: [],
  avatarURL: '',
  currentCourse: '',
  goal: '',
  studyPlan: '',
  totalPoints: '',
  userName: 0,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER_PAGE:
    case FETCH_PROGRESS:
    case ADD_PROGRESS:
    case MODIFY_PROGRESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
