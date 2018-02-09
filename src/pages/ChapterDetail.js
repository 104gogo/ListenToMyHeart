import { connect } from 'dva-no-router';
import ChapterDetail from '../components/ChapterDetail';

function mapStateToProps({ chapterDetail }) {
  return { ...chapterDetail };
}

function mapDispatchToProps(dispatch) {
  return {
    // 获取初始化数据，书源列表、章节列表、章节内容
    getBookSources(id) {
      dispatch({ type: 'chapterDetail/resetState' });
      dispatch({ type: 'chapterDetail/getBookSources', payload: { id } });
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
