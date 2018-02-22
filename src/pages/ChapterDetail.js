import { connect } from 'dva-no-router';
import ChapterDetail from '../components/ChapterDetail';

function mapStateToProps({ chapterDetail }) {
  return { ...chapterDetail };
}

function mapDispatchToProps(dispatch) {
  return {
    // 获取章节内容
    getChapter(pn) {
      // dispatch({ type: 'chapterDetail/resetState' });
      dispatch({ type: 'chapterDetail/updateState', payload: { pn } });
      dispatch({ type: 'chapterDetail/getChapter' });
    },
    // 获取语音合成后的mp3
    getMp3Url(text, index) {
      dispatch({ type: 'chapterDetail/getMp3Url', payload: { text, index } });
    },
    updateState(state) {
      dispatch({ type: 'chapterDetail/updateState', payload: state });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChapterDetail);
