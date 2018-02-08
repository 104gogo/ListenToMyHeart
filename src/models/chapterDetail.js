import services from '../services';

const initialState = {
  bookSources: [], // 书源列表
  chapters: [], // 章节列表
  chapter: {
    lines: [], // 章节内容每行数组
  },
  url: '', // mp3地址
  readIndex: -1, // 阅读的行数
  isRead: false, // 是否在阅读
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

      const { chapters = [] } = yield call(services.chapterDetail.getChapters, sourceId);
// console.log('chapters', chapters);
      const chapter = chapters[0];

      const { chapter: { body } } = yield call(services.chapterDetail.getChapter, encodeURIComponent(chapter.link));

      chapter.content = body;
      chapter.lines = body.split(/\r\n|[\r\n]/);
// console.log('chapter', chapter);

      yield put({ type: 'updateState', payload: { chapter } });
    },

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
      return { ...state, ...initialState };
    },
  },
};
