import services from '../services';

export default {
  namespace: 'login',
  state: {
    code: '',
    codeBtnDisabled: false,
    loginBtnDisabled: true
  },
  effects: {
    * getVerifiableCode({ payload }, { put }) {
      yield put({
        type: 'updateState',
        payload: {
          codeBtnDisabled: true,
          loginBtnDisabled: true
        }
      });
      const code = yield services.login.getVerifiableCode();
      yield put({
        type: 'updateState',
        payload: {
          code,
          codeBtnDisabled: false,
          loginBtnDisabled: false
        }
      });
    }
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    }
  }
};
