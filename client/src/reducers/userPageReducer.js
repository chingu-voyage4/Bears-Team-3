import {
  FETCH_USER_PAGE,
  ADD_PROGRESS,
  FETCH_PROGRESS,
  MODIFY_PROGRESS,
  DELETE_PROGRESS,
  CLEAR_USER_PAGE,
} from '../actions/types';

const INITIAL_STATE = {
  activities: [],
  avatarURL: '',
  currentCourse: '',
  goal: '',
  studyPlan: '',
  totalPoints: 0,
  userName: '',
  _id: '',
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER_PAGE:
    case FETCH_PROGRESS:
    case ADD_PROGRESS:
    case MODIFY_PROGRESS:
      return { ...state, ...action.payload };
    case DELETE_PROGRESS:
      return { ...state, goal: '', currentCourse: '', studyPlan: '' };
    case CLEAR_USER_PAGE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
