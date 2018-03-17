import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../actions/userActions';
import fetchMock from 'fetch-mock';
import { LOGOUT, FETCH_USER } from '../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should handle LOGOUT action', () => {
    // const func = actions.logout();
    // expect(typeof func).toBe('function');
    fetchMock.get('/api/logout', { body: { req: null } });
    const expectedAction = {
      type: LOGOUT,
      body: { req: null },
    };
    const store = mockStore({});

    return store.dispatch(actions.logout()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
  it('should handle FETCH_USER action', () => {
    const func = actions.fetchUser();
    expect(typeof func).toBe('function');
  });
});
