import React, { PureComponent } from 'react';
import {
  Text,
  View,
  StatusBar,
} from 'react-native';
import Sound from 'react-native-sound';

import { Articles } from '../common';
import styles from './styles';

export default class ChapterDetail extends PureComponent {
  constructor() {
    super();

    this.onLinePress = this.onLinePress.bind(this);
  }

  componentDidMount() {
    const { navigation, getInitData } = this.props;

    getInitData(navigation.state.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if ('url' in nextProps) {
      const s = new Sound(nextProps.url, null, (e) => {
        if (e) {
          console.log('播放失败');
          return;
        }
        s.play(() => s.release());
      });
    }
  }

  onLinePress(text) {
    this.props.getMp3Url(text);
  }

  render() {
    const { chapter } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.header}>
          <Text>{chapter.title}</Text>
        </View>
        <Articles
          lineHeight={25}
          fontSize={18}
          content={chapter.content}
          onLinePress={this.onLinePress}
        />
      </View>
    );
  }
}
