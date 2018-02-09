import React, { PureComponent } from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import Sound from 'react-native-sound';

import { Articles } from '../common';
import styles from './styles';

export default class ChapterDetail extends PureComponent {
  constructor() {
    super();

    this.handleLinePress = this.handleLinePress.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
  }

  componentDidMount() {
    const { navigation, getBookSources } = this.props;

    getBookSources(navigation.state.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if ('url' in nextProps && this.props.url !== nextProps.url) {
      const { url, chapter: { lines }, readIndex, updateState } = nextProps;

      const sound = new Sound(url, null, (e) => {
        if (e) {
          console.log('播放失败');
          return;
        }

        this.sound = sound;
        updateState({ isRead: true });

        sound.play((success) => {
          if (success) {
            const nextIndex = readIndex + 1;
            if (nextIndex < lines.length) {
              this.props.getMp3Url(lines[nextIndex], nextIndex);
              return;
            }
          }

          this.soundClose();
        });
      });
    }
  }

  soundClose() {
    this.sound.release();
    console.log('播放完毕');
    this.props.updateState({ isRead: false });
  }

  handleLinePress(text, index) {
    this.props.getMp3Url(text, index);
  }

  handleShowModal() {
    this.soundClose();
  }

  render() {
    const { chapter, isRead } = this.props;
    const { title, lines } = chapter;

    const renderArticle = () => (
      <Articles
        lineHeight={25}
        fontSize={18}
        isRead={isRead}
        lines={lines}
        onLinePress={this.handleLinePress}
      />
    );

    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.header}>
          <Text>{title}</Text>
        </View>
        {isRead ? (
          <TouchableOpacity onPress={this.handleShowModal}>
            {renderArticle()}
          </TouchableOpacity>
        ) : renderArticle()}
      </View>
    );
  }
}
