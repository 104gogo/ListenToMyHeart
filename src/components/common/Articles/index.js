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
    const { lines, onLinePress } = this.props;

    return (
      <ScrollView style={styles.wrapper} showsPagination={false}>
        {lines.map((line, index) =>
          <View style={styles.slide} key={index}>
            <TouchableOpacity onLongPress={() => onLinePress(line, index)}>
              <Text style={styles.text}>{line}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    );
  }
}
