import React, { PureComponent } from 'react';
import { View, Text, StatusBar } from 'react-native';

import style from './style';

export default class BookList extends PureComponent {
  componentDidMount() {
    const { navigation, getInitData } = this.props;

    getInitData(navigation.state.params.id);
  }

  render() {
    const { chapter } = this.props;

    return (
      <View style={style.container}>
        <StatusBar hidden />
        <View style={style.header}>
          <Text>{chapter.title}</Text>
        </View>
        <View style={style.body}>
          <Text>{chapter.content}</Text>
        </View>
      </View>
    );
  }
}

