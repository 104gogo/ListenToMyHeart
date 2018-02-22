import services from '../services';
import storage from '../utils/storage';

const initialState = {
  storageBook: {}, // 缓存的小说列表数据, { 55eef8b27445ad27755670b9: [{ host: 'book.my716.com', _id: '' }] }
  storageCapter: {}, // 缓存的小说内容数据, { 55eef8b27445ad27755670b9: { 0: { line: [], content: '', title: '' }, 2: {} } }
  bookSources: [], // 书源列表
  chapters: [], // 章节列表
  chapter: {
    lines: [], // 章节内容每行数组
  },
  url: '', // mp3地址
  pn: 0, // 页数
  readIndex: -1, // 阅读的行数
  isRead: false, // 是否在阅读
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
      const storageBook = yield call(storage.get, 'storageBook');
      const storageCapter = yield call(storage.get, 'storageCapter');

      yield put({
        type: 'updateState',
        payload: { storageBook: storageBook || {}, storageCapter: storageCapter || {} },
      });
    },

    // 获取小说源列表
    * getBookSources({ payload: { id } }, { put, call, select }) {
      const { storageBook } = yield select(({ chapterDetail }) => chapterDetail);
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

      yield put({ type: 'updateState', payload: { bookSources, bookId: id } });
      yield put({ type: 'getChapters' });
    },

    // 获取小说章节列表
    * getChapters({ payload }, { put, call, select }) {
      const { bookSources } = yield select(({ chapterDetail }) => chapterDetail);
      let chapters;

      // 追书神器的书源看不了，所以从1开始取
      for (let i = 1; i < bookSources.length; i += 1) {
        const bookSource = bookSources[i];
        const results = yield call(services.chapterDetail.getChapters, bookSource._id);
        chapters = results.chapters;

        if (chapters && chapters.length) break;
      }

      if (!chapters) {
        console.log('没有找到合适的书源！');
      }

      yield put({ type: 'updateState', payload: { chapters } });
      yield put({ type: 'getChapter' });
    },

    // 获取小说章节内容
    * getChapter({ payload }, { put, call, select }) {
      const { chapters, storageCapter, bookId, pn } = yield select(({ chapterDetail }) => chapterDetail);

      const chaptersObj = storageCapter[bookId] || {};
      let chapter = chapters[pn];

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
console.log('newChapters', newChapters);
      yield put({ type: 'updateState', payload: { chapters: newChapters } });
    },

    // 获取语音合成的mp3地址
    * getMp3Url({ payload: { text, index } }, { put, call }) {
      const { url } = yield call(services.chapterDetail.getMp3Url, encodeURIComponent(text));
      yield put({ type: 'updateState', payload: { url, readIndex: index } });
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
    resetState(state) {
      // 部分数据不还原
      const { storageBook, storageCapter, ...others } = initialState;
      return { ...state, ...others };
    },
  },
};
