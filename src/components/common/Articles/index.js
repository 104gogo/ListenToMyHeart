import React, { PureComponent } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';

export default class Articles extends PureComponent {
  render() {
    const { lines, onLinePress, onLineLongPress, isRead } = this.props;

    const renderLine = line => <Text style={styles.text}>{line}</Text>;

    return (
      <ScrollView style={styles.wrapper} showsPagination={false}>
        {lines.map((line, index) =>
          <View style={styles.slide} key={index}>
            {!isRead ? (
              <TouchableOpacity
                onPress={onLinePress}
                onLongPress={() => onLineLongPress(line, index)}
              >
                {renderLine(line)}
              </TouchableOpacity>
            ) : (
              renderLine(line)
            )}
          </View>
        )}
      </ScrollView>
    );
  }
}
