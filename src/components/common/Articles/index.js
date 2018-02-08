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
    const { content = '', onLinePress } = this.props;
    const lines = content.split(/\r\n|[\r\n]/);

    return (
      <ScrollView style={styles.wrapper} showsPagination={false}>
        {lines.map((line, index) =>
          <View style={styles.slide} key={index}>
            <TouchableOpacity onLongPress={() => onLinePress(line)}>
              <Text style={styles.text}>{line}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    );
  }
}
