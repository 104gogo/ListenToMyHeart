import React, { PureComponent } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

class Footer extends PureComponent {
  render() {
    return (
      <View style={styles.wrapper}>
        <Icon
          name="list-ul"
          size={30}
          style={styles.text}
          onPress={this.props.onListPress}
        />
      </View>
    );
  }
}

export default Footer;
