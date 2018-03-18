import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { logout, fetchUser } from '../../actions/userActions';
import { LOGOUT, FETCH_USER } from '../../actions/types';

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});

console.log('actions.logout: ', logout);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('User actions', () => {
  it('should handle LOGOUT action', () => {
    const store = mockStore({});

    console.log('actions.logout() ', logout());
    console.log('store ', store);

    console.log('store.dispatch(actions.logout()) ', store.dispatch(logout()));

    return store.dispatch(logout({})).then(() => {
      const actions = store.getActions();
      console.log(store.getActions());
      expect(actions[0]).toEqual({ type: LOGOUT });
    });
  });

  it('should handle FETCH_USER action', () => {
    const store = mockStore({});

    console.log(
      'store.dispatch(actions.fetchUser()) ',
      store.dispatch(fetchUser())
    );

    return store.dispatch(fetchUser()).then(() => {
      const actions = store.getActions();
      console.log(store.getActions());
      expect(actions[0]).toEqual({ type: FETCH_USER });
    });
  });
});

//   // it('should handle FETCH_USER action', () => {
//   //   const func = actions.fetchUser();
//   //   expect(typeof func).toBe('function');
//   // });
// });
