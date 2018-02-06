import services from '../services';

export default {
  namespace: 'bookList',

  state: {
    bookIds: ['50c00e34901245c74d000001', '55eef8b27445ad27755670b9'],
    books: [],
  },

  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'getBooks' });
    }
  },

  effects: {
    * getBooks({ payload }, { put, call, select }) {
      const { bookIds } = yield select(({ bookList }) => bookList);
      const books = [];

      for (let i = 0; i < bookIds.length; i += 1) {
        const book = yield call(services.bookList.getBook, { id: bookIds[i] });
        books.push(book);
      }

      yield put({ type: 'updateState', payload: { books } });
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    }
  },
};
