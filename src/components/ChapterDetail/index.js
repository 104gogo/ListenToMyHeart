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
      const { url, chapter: { lines }, readIndex } = nextProps;
      const s = new Sound(url, null, (e) => {
        if (e) {
          console.log('播放失败');
          return;
        }
        s.play((success) => {
          if (success) {
            const nextIndex = readIndex + 1;
            if (nextIndex < lines.length) {
              this.props.getMp3Url(lines[nextIndex], nextIndex);
            } else {
              console.log('播放完毕');
              return;
            }
          }
          s.release();
        });
      });
    }
  }

  onLinePress(text, index) {
    this.props.getMp3Url(text, index);
  }

  render() {
    const { chapter } = this.props;
    const { title, lines } = chapter;

    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.header}>
          <Text>{title}</Text>
        </View>
        <Articles
          lineHeight={25}
          fontSize={18}
          lines={lines}
          onLinePress={this.onLinePress}
        />
      </View>
    );
  }
}
