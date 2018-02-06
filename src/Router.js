import React from 'react';
import { connect } from 'dva-no-router';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { BookList, UserManage, UserDetails } from './pages';

const AppNavigator = StackNavigator(
  {
    BookList: {
      screen: BookList,
    },
    UserManage: {
      screen: UserManage,
    },
    UserDetails: {
      screen: UserDetails,
    },
  },
  {
    initialRouteName: 'BookList',
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
