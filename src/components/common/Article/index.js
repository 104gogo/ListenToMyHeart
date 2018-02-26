import React, { PureComponent } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';

export default class Article extends PureComponent {
  render() {
    const { lines, onLinePress, onLineLongPress, isRead, readIndex } = this.props;

    const renderLine = (line, index) => {
      const isCurrentLine = readIndex === index;

      return (
        <Text style={[styles.text, isCurrentLine && { backgroundColor: '#888d8d' }]}>
          {line}
        </Text>
      );
    };

    return (
      <ScrollView style={styles.wrapper} showsPagination={false}>
        {lines.map((line, index) =>
          <View style={styles.slide} key={index}>
            {!isRead ? (
              <TouchableOpacity
                onPress={onLinePress}
                onLongPress={() => onLineLongPress(line, index)}
              >
                {renderLine(line, index)}
              </TouchableOpacity>
            ) : (
              renderLine(line, index)
            )}
          </View>
        )}
      </ScrollView>
    );
  }
}
