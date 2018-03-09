import React, { PureComponent } from 'react';
import {
  Text,
  View,
  StatusBar,
} from 'react-native';
import Sound from 'react-native-sound';

import Footer from './Footer';
import ListModal from './ListModal';
import { Back, Page } from '../common';
import styles from './styles';

export default class ChapterDetail extends PureComponent {
  constructor() {
    super();

    this.state = { isShowHeader: false };
    this.timer = null;

    this.handleLineLongPress = this.handleLineLongPress.bind(this);
    this.handleSoundClose = this.handleSoundClose.bind(this);
    this.handleToolBar = this.handleToolBar.bind(this);
    this.handlePageIndexChanged = this.handlePageIndexChanged.bind(this);
    this.handleListPress = this.handleListPress.bind(this);
    this.handleTitlePress = this.handleTitlePress.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // 循环播放mp3
    if ('url' in nextProps && this.props.url !== nextProps.url) {
      const { url, chapters, readIndex, pn } = nextProps;
      const { lines = [] } = chapters[pn];

      const sound = new Sound(url, null, (e) => {
        if (e) {
          console.log('播放失败');
          return;
        }

        this.sound = sound;
        this.props.updateState({ isRead: true });

        sound.play((success) => {
          if (success) {
            const nextIndex = readIndex + 1;

            // 换行
            if (nextIndex < lines.length) {
              this.props.getMp3Url(lines[nextIndex], nextIndex);
              return;
            }

            // 翻页
            this.changePage(pn + 1);
            return;
          }

          this.closeAllEvent();
        });
      });
    }

    // 自动翻页，获取mp3
    if ('chapters' in nextProps && this.props.chapters !== nextProps.chapters && nextProps.isRead) {
      const { chapters, readIndex, pn } = nextProps;
      const { lines } = chapters[pn];

      this.props.getMp3Url(lines[readIndex], readIndex);
    }
  }

  componentWillUnmount() {
    this.closeAllEvent();
  }

  closeAllEvent() {
    clearInterval(this.timer);
    this.soundClose();
  }

  // 确定页数翻页
  changePage(nextPn) {
    const { pn } = this.props;

    this.page.scrollBy(nextPn - pn);
  }

  soundClose() {
    const { isRead, updateState } = this.props;

    if (isRead) {
      this.sound.release();
      console.log('停止播放');
      updateState({ isRead: false });
    }
  }

  handleLineLongPress(text, index) {
    this.props.getMp3Url(text, index);

    this.timer = setInterval(() => {
      this.closeAllEvent();
    }, 30 * 60 * 1000);
  }

  // 控制工具栏的显隐
  handleToolBar() {
    this.setState({ isShowHeader: !this.state.isShowHeader });
  }

  // 点击后关闭语音
  handleSoundClose() {
    this.closeAllEvent();
  }

  // 翻页获取内容
  handlePageIndexChanged(pn) {
    this.props.getChapter(pn);
  }

  // 显示选择章节弹出框
  handleListPress() {
    this.setState({ isShowHeader: false });
    this.modal.open();
  }

  // 选择章节
  handleTitlePress(pn) {
    this.modal.close();
    this.changePage(pn);
  }

  render() {
    const { isShowHeader } = this.state;
    const { chapters, isRead, pn, readIndex } = this.props;

    const listModalProps = {
      chapters,
      onTitlePress: this.handleTitlePress,
    };

    return (
      <View style={styles.container}>
        <StatusBar hidden />
        {isShowHeader ? (
          <View style={styles.header}>
            <Back />
          </View>
        ) : null}
        <View style={styles.title}>
          <Text>{chapters[pn] && chapters[pn].title}</Text>
        </View>
        <Page
          ref={page => this.page = page}
          isRead={isRead}
          pn={pn}
          readIndex={readIndex}
          chapters={chapters}
          onLineLongPress={this.handleLineLongPress}
          onLinePress={this.handleToolBar}
          onArticlePress={this.handleSoundClose}
          onIndexChanged={this.handlePageIndexChanged}
        />
        {isShowHeader ? <Footer onListPress={this.handleListPress} /> : null}
        <ListModal
          ref={modal => this.modal = modal}
          {...listModalProps}
        />
      </View>
    );
  }
}
