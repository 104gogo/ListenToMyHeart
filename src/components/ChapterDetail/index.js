import React, { PureComponent } from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import Sound from 'react-native-sound';

import { Articles, Back } from '../common';
import styles from './styles';

export default class ChapterDetail extends PureComponent {
  constructor() {
    super();

    this.state = { isShowHeader: false };

    this.handleLineLongPress = this.handleLineLongPress.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleSoundClose = this.handleSoundClose.bind(this);
    this.handleToolBar = this.handleToolBar.bind(this);
  }

  componentDidMount() {
    const { navigation, getBookSources } = this.props;

    getBookSources(navigation.state.params.id);
    // getBookSources('55eef8b27445ad27755670b9');
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

          this.handleSoundClose();
        });
      });
    }
  }

  componentWillUnmount() {
    this.handleSoundClose();
  }

  handleSoundClose() {
    const { isRead, updateState } = this.props;

    if (isRead) {
      this.sound.release();
      console.log('停止播放');
      updateState({ isRead: false });
    }
  }

  handleLineLongPress(text, index) {
    this.props.getMp3Url(text, index);
  }

  // 控制工具栏的显隐
  handleToolBar() {
    this.setState({ isShowHeader: !this.state.isShowHeader });
  }

  // 显示播放栏
  handleShowModal() {
    // TODO


    this.handleSoundClose();
  }

  render() {
    const { isShowHeader } = this.state;
    const { chapter, isRead } = this.props;
    const { title, lines } = chapter;

    const renderArticle = () => (
      <Articles
        lineHeight={25}
        fontSize={18}
        isRead={isRead}
        lines={lines}
        onLineLongPress={this.handleLineLongPress}
        onLinePress={this.handleToolBar}
      />
    );

    return (
      <View style={styles.container}>
        <StatusBar hidden />
        {isShowHeader ? (
          <View style={styles.header}>
            <Back />
          </View>
        ) : null}
        <View style={styles.title}>
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
