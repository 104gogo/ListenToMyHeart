import services from '../services';

const initialState = {
  bookSources: [], // 书源列表
  chapters: [], // 章节列表
  chapter: {}, // 章节内容
  url: '',
};

export default {
  namespace: 'chapterDetail',

  state: initialState,

  subscriptions: {
    setup({ dispatch }) {
    }
  },

  effects: {
    // 获取小说列表
    * getInitData({ payload: { id } }, { put, call }) {
      const bookSources = yield call(services.chapterDetail.getBookSources, id);
// console.log('bookSources', bookSources);
      let sourceId = bookSources.length > 1 ? bookSources[1]._id : bookSources[0]._id;
      sourceId = (bookSources.find(({ source }) => source === 'my176') || {})._id || sourceId;

      const { chapters } = yield call(services.chapterDetail.getChapters, sourceId);
// console.log('chapters', chapters);
      const chapter = chapters[0];

      const { chapter: { body } } = yield call(services.chapterDetail.getChapter, encodeURIComponent(chapter.link));

      chapter.content = body;
// console.log('chapter', chapter);
      // for (let i = 0; i < bookIds.length; i += 1) {
      //   const id = bookIds[i];
      //   const book = yield call(services.bookList.getBook, id);
      //   books.push(book);
      // }

      yield put({ type: 'updateState', payload: { chapter } });
    },

    * getMp3Url({ payload: { text } }, { put, call }) {
      const { url } = yield call(services.chapterDetail.getMp3Url, encodeURIComponent(text));
      yield put({ type: 'updateState', payload: { url } });
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
    resetState(state) {
      return { ...state, ...initialState };
    },
  },
};
