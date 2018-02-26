import React, { PureComponent } from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';

import Article from '../Article';
import styles from './styles';

export default class Page extends PureComponent {
  render() {
    const {
      readIndex,
      pn,
      chapters,
      isRead,
      onLinePress,
      onLineLongPress,
      onArticlePress,
      onIndexChanged,
    } = this.props;

    const renderArticle = lines => (
      <Article
        isRead={isRead}
        readIndex={readIndex}
        lines={lines}
        onLineLongPress={onLineLongPress}
        onLinePress={onLinePress}
      />
    );

    const swiperProps = {
      index: pn,
      // loadMinimal: true,
      // loadMinimalSize: 1,
      style: styles.wrapper,
      showsPagination: false,
      onMomentumScrollEnd: (event, state) => {
        console.log('onMomentumScrollEnd', state.index)
        onIndexChanged(state.index);
      },
      loop: false, // 设置loop为false，避免出现意想不到的问题
    };

    return (
      <Swiper {...swiperProps}>
        {
          chapters.map(({ lines = [] }, index) => (
            <View style={styles.slide} key={index}>
              {isRead ? (
                <TouchableOpacity onPress={onArticlePress}>
                  {renderArticle(lines)}
                </TouchableOpacity>
              ) : renderArticle(lines)}
            </View>
          ))
        }
      </Swiper>
    );
  }
}
