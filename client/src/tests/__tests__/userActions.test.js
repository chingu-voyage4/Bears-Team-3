import * as actions from '../../actions/userActions';
import { LOGOUT, FETCH_USER } from '../../actions/types';

describe('User actions', () => {
  it('should handle LOGOUT action', () => {
    const func = actions.logout();
    expect(typeof func).toBe('function');
  });
  it('should handle FETCH_USER action', () => {
    const func = actions.fetchUser();
    expect(typeof func).toBe('function');
  });
});
