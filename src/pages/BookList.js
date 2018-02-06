import { connect } from 'dva-no-router';
import BookList from '../components/BookList';

function mapStateToProps({ bookList }) {
  return { ...bookList };
}

export default connect(mapStateToProps)(BookList);
