import { NavigationActions } from 'react-navigation';
import { routerReducer } from '../Router';

const createAction = type => payload => ({ type, payload });

const watcher = { type: 'watcher' };

const actions = [
  NavigationActions.BACK,
  NavigationActions.INIT,
  NavigationActions.NAVIGATE,
  NavigationActions.RESET,
  NavigationActions.SET_PARAMS,
  NavigationActions.URI,
];

export default {
  namespace: 'router',
  state: {
    ...routerReducer(),
  },
  reducers: {
    apply(state, { payload: action }) {
      return routerReducer(state, action);
    },
  },
  effects: {
    watch: [
      function* subscription({ take, put }) {
        while (true) {
          const payload = yield take(actions);
          yield put(createAction('apply')(payload));
          console.log('11111', payload);
          // if (payload.type === 'Navigation/NAVIGATE') {
          //   console.log('11111', payload);
          // }
        }
      }, watcher]
  },
};
