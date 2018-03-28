import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import { logout, fetchUser } from '../../actions/userActions';
import { LOGOUT, FETCH_USER } from '../../actions/types';
import fetchUserMock from '../__mock__/fetchUserMock.json';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('User actions', () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  it('should handle LOGOUT action', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
      });
    });

    const store = mockStore({});

    return store.dispatch(logout()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({ type: LOGOUT });
    });
  });

  it('should handle FETCH_USER action', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: fetchUserMock,
      });
    });

    const store = mockStore({ resData: {} });

    return store.dispatch(fetchUser()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({ type: FETCH_USER, resData: fetchUserMock });
    });
  });
});
