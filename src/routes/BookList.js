import { connect } from 'dva-no-router';
import BookList from '../components/BookList';

function mapStateToProps({ bookList }) {
  return {
    ...bookList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
