import React from 'react';
import { connect } from 'dva-no-router';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { Login, UserManage, UserDetails } from './pages';

const AppNavigator = StackNavigator(
  {
    Login: {
      screen: Login,
    },
    UserManage: {
      screen: UserManage,
    },
    UserDetails: {
      screen: UserDetails,
    },
  },
  {
    initialRouteName: 'Login',
    navigationOptions: {
      header: null,
    }
  }
);

const Router = ({ dispatch, router }) => {
  const navigation = addNavigationHelpers({ dispatch, state: router });
  return <AppNavigator navigation={navigation} />;
};

function mapStateToProps({ router }) {
  return {
    router
  };
}

export default connect(mapStateToProps)(Router);

export function routerReducer(state, action = {}) {
  return AppNavigator.router.getStateForAction(action, state);
}
