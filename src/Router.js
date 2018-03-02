import React from 'react';
import { connect } from 'dva-no-router';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { BookList, ChapterDetail } from './pages';
import { Root } from './components/common';

const AppNavigator = StackNavigator(
  {
    BookList: {
      screen: BookList,
    },
    ChapterDetail: {
      screen: ChapterDetail,
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
  return (
    <Root>
      <AppNavigator navigation={navigation} />
    </Root>
  );
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
