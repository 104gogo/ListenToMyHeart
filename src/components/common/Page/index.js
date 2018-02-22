import React, { PureComponent } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';

import Article from '../Article';
import styles from './styles';

export default class Page extends PureComponent {
  render() {
    const { chapters, onLinePress, onLineLongPress, onArticlePress, onIndexChanged, isRead } = this.props;

    const renderArticle = lines => (
      <Article
        isRead={isRead}
        lines={lines}
        onLineLongPress={onLineLongPress}
        onLinePress={onLinePress}
      />
    );

    const swiperProps = {
      index: 0,
      loadMinimal: true,
      loadMinimalSize: 1,
      style: styles.wrapper,
      showsPagination: false,
      onMomentumScrollEnd: (event, state) => {
        console.log('onMomentumScrollEnd')
        onIndexChanged(state.index);
      }
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
