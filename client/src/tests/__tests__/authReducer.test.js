import authReducer from '../../reducers/authReducer';
import { LOGOUT, FETCH_USER } from '../../actions/types';
import fetchUserMock from '../__mock__/fetchUserMock.json';

describe('Authentication reducer', () => {
  it('should return initial state', () => {
    expect(authReducer(undefined, {})).toEqual({});
  });
  it('should handle FETCH_USER', () => {
    const fetchUserAction = {
      type: FETCH_USER,
      resData: fetchUserMock,
    };
    expect(authReducer({}, fetchUserAction)).toEqual(fetchUserMock);
  });
  //it('should handle LOGOUT');
});
