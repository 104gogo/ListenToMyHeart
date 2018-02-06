import { connect } from 'dva-no-router';
import Login from '../components/Login';

function mapStateToProps({ login }) {
  return {
    ...login,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onCodePress(data) {
      dispatch({ type: 'login/getVerifiableCode', payload: data });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
