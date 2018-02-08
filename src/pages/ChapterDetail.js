import { connect } from 'dva-no-router';
import ChapterDetail from '../components/ChapterDetail';

function mapStateToProps({ chapterDetail }) {
  return { ...chapterDetail };
}

function mapDispatchToProps(dispatch) {
  return {
    // 获取初始化数据，书源列表、章节列表、章节内容
    getInitData(id) {
      dispatch({ type: 'chapterDetail/resetState' });
      dispatch({ type: 'chapterDetail/getInitData', payload: { id } });
    },
    // 获取语音合成后的mp3
    getMp3Url(text) {
      dispatch({ type: 'chapterDetail/getMp3Url', payload: { text } });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChapterDetail);
