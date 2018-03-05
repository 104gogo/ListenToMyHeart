import services from '../services';
import storage from '../utils/storage';

const initialState = {
  storagePageNumber: {},
  storageCapter: {}, // 缓存的小说内容数据, { 55eef8b27445ad27755670b9: { 0: { line: [], content: '', title: '' }, 2: {} } }
  chapters: [{
    lines: [], // 章节内容每行数组
  }],
  url: '', // mp3地址
  pn: 0, // 页数
  readIndex: -1, // 阅读的行数
  isRead: false, // 是否在阅读
  bookId: '', // 小说id
};

export default {
  namespace: 'chapterDetail',

  state: initialState,

  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'getStorageData' });
    }
  },

  effects: {
    // 从缓存中读取小说的数据
    * getStorageData({ payload }, { put, call }) {
      const storageCapter = yield call(storage.get, 'storageCapter');

      yield put({
        type: 'updateState',
        payload: { storageCapter: storageCapter || {} },
      });
    },

    // 获取小说章节内容
    * getChapter({ payload }, { put, call, select }) {
      const { chapter: bookListChapter } = yield select(({ bookList }) => bookList);
      const { storagePageNumber, storageCapter, pn, bookId, isRead } = yield select(({ chapterDetail }) => chapterDetail);

      const chaptersObj = storageCapter[bookId] || {};
      const chapters = bookListChapter[bookId];
      let chapter = chapters[pn];

      storagePageNumber[bookId] = pn;
      yield call(storage.set, 'storagePageNumber', storagePageNumber);

      // 首先从缓存中获取数据
      if (chaptersObj[pn]) {
        chapter = chaptersObj[pn];
      // 否则调用接口
      } else {
        const { chapter: { body } } = yield call(services.chapterDetail.getChapter, encodeURIComponent(chapter.link));
        const lines = body.split(/\r\n|[\r\n]/);

        // 存入缓存
        chaptersObj[pn] = { ...chapter, content: body, lines };
        storageCapter[bookId] = chaptersObj;
        yield call(storage.set, 'storageCapter', storageCapter);
      }

      const newChapters = [...chapters.slice(0, pn), chaptersObj[pn], ...chapters.slice(pn + 1)];

      yield put({ type: 'updateState', payload: { chapters: newChapters, readIndex: isRead ? 0 : -1 } });
    },

    // 获取语音合成的mp3地址
    * getMp3Url({ payload: { text, index } }, { put, call }) {
      const { url } = yield call(services.chapterDetail.getMp3Url, encodeURIComponent(text));

      yield put({ type: 'updateState', payload: { url, readIndex: index } });
    },

    // 获取缓存的阅读页数
    * getPageNumber({ payload: { id } }, { put, call }) {
      let storagePageNumber = yield call(storage.get, 'storagePageNumber');
      storagePageNumber = storagePageNumber || {};
      const pageNumber = storagePageNumber[id] || 0;
console.log('pageNumber', pageNumber);
      yield put({ type: 'updateState', payload: { pn: pageNumber, storagePageNumber } });
      // 初始化当前页内容
      yield put({ type: 'getChapter' });
    },
  },

  reducers: {
    updateState(state, { payload }) {
      console.log('payload', payload);
      return { ...state, ...payload };
    },
    resetState(state) {
      return { ...state, ...initialState };
    },
  },
};
