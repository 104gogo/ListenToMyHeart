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
    * getBookSources({ payload: { id } }, { put, call }) {
      const bookSources = yield call(services.chapterDetail.getBookSources, id);
      yield put({ type: 'updateState', payload: { bookSources } });
      yield put({ type: 'getChapters' });

// console.log('bookSources', bookSources);
    },

    // 获取小说章节列表
    * getChapters({ payload }, { put, call, select }) {
      const { bookSources } = yield select(({ chapterDetail }) => chapterDetail);
      let chapters;

      for (let i = 1; i < bookSources.length; i += 1) {
        const results = yield call(services.chapterDetail.getChapters, bookSources[i]._id);
        console.log('results', results);
        if (results.chapters && results.chapters.length) {
          chapters = results.chapters;
          break;
        }
      }

      if (!chapters) {
        console.log('没有找到合适的书源！');
      }
// console.log('chapters', chapters);

      yield put({ type: 'updateState', payload: { chapters } });
      yield put({ type: 'getChapter' });
    },

    // 获取小说章节内容
    * getChapter({ payload }, { put, call, select }) {
      const { chapters } = yield select(({ chapterDetail }) => chapterDetail);

      const chapter = chapters[0]; // 取第一章

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
