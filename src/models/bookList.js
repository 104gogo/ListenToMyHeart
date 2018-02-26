import services from '../services';
import storage from '../utils/storage';

export default {
  namespace: 'bookList',

  state: {
    storageBook: {}, // 缓存的书源列表数据, { 55eef8b27445ad27755670b9: [{ host: 'book.my716.com', _id: '' }] }
    bookSources: [], // 书源列表
    chapter: {}, // 所有书的章节
    bookIds: ['50c00e34901245c74d000001', '55eef8b27445ad27755670b9'],
    books: [],
  },

  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'getBooks' });
    }
  },

  effects: {
    // 获取小说列表
    * getBooks({ payload }, { put, call, select }) {
      let storageBook = yield call(storage.get, 'storageBook');
      storageBook = storageBook || {};

      const { bookIds } = yield select(({ bookList }) => bookList);
      const books = [];

      for (let i = 0; i < bookIds.length; i += 1) {
        const id = bookIds[i];
        const book = yield call(services.bookList.getBook, id);

        books.push(book);
      }

      yield put({ type: 'updateState', payload: { books, storageBook } });

      for (let i = 0; i < bookIds.length; i += 1) {
        yield put({ type: 'getBookSources', payload: { id: bookIds[i] } });
      }
    },

    // 从缓存中读取小说的数据
    * getBookSources({ payload: { id } }, { put, call, select }) {
      const { storageBook } = yield select(({ bookList }) => bookList);

      let bookSources = [];

      // 首先从缓存中获取数据
      if (storageBook && storageBook[id]) {
        bookSources = storageBook[id];
      // 否则调用接口
      } else {
        bookSources = yield call(services.chapterDetail.getBookSources, id);
        // 存入缓存
        storageBook[id] = bookSources;
        yield call(storage.set, 'storageBook', storageBook);
      }

      yield put({ type: 'getChapters', payload: { bookSources, id } });
    },

    // 获取小说章节列表
    * getChapters({ payload: { bookSources, id } }, { put, call }) {
      const bookSource = bookSources.find(({ source }) => source === 'my176');
      const { chapters } = yield call(services.chapterDetail.getChapters, bookSource._id);
console.log('bookSources', bookSources);
console.log('chapters', chapters);
      yield put({ type: 'updateChapter', payload: { id, chapters } });
    },

  },

  reducers: {
    updateChapter(state, { payload: { id, chapters } }) {
      return { ...state, chapter: { ...state.chapter, [id]: chapters } };
    },

    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
