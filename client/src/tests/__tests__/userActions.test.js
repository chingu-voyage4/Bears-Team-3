import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../actions/userActions';
import { LOGOUT, FETCH_USER } from '../../actions/types';

process.on('unhandledRejection', reason => {
  console.log('Unhandled Promise Rejection Reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

console.log('actions.logout: ', actions.logout);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('User actions', () => {
  it('should handle LOGOUT action', () => {
    const store = mockStore({});

    console.log('actions.logout() ', actions.logout());
    console.log('store ', store);

    console.log(
      'store.dispatch(actions.logout()) ',
      store.dispatch(actions.logout())
    );

    return store.dispatch(actions.logout()).then(() => {
      const actions = store.getActions();
      console.log(store.getActions());
      expect(actions[0]).toEqual({ type: LOGOUT });
    });
  });

  it('should handle FETCH_USER action', () => {
    const store = mockStore({});

    return store.dispatch(actions.fetchUser()).then(() => {
      const actions = store.getActions();
      console.log(store.getActions());
      expect(actions[0]).toEqual({ type: FETCH_USER });
    });
  });
});

// import configureStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import * as actions from '../../actions/userActions';
// import { LOGOUT } from '../../actions/types';

// process.on('unhandledRejection', reason => {
//   console.log('reason:', reason);
//   // application specific logging, throwing an error, or other logic here
// });

// // process.on('warning', warning => {
// //   console.warn(warning.name); // Print the warning name
// //   console.warn(warning.message); // Print the warning message
// //   console.warn(warning.stack); // Print the stack trace
// // });
// const middlewares = [thunk];
// const mockStore = configureStore(middlewares);

// describe('User actions', () => {
//   it('should handle LOGOUT action', () => {
//     const store = mockStore({});

//     console.log(store);
//     console.log(actions.logout());

//     return store.dispatch(actions.logout()).then(() => {
//       const actions = store.getActions();
//       expect(actions[0]).toEqual(LOGOUT);
//     });
//   });

//   // it('should handle FETCH_USER action', () => {
//   //   const func = actions.fetchUser();
//   //   expect(typeof func).toBe('function');
//   // });
// });
