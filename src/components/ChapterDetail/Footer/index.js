import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

class Footer extends PureComponent {
  render() {
    return (
      <Grid style={styles.wrapper}>
        <Row>
          <Col style={styles.center}>
            <Icon
              name="list-ul"
              size={28}
              style={styles.icon}
              onPress={this.props.onListPress}
            />
          </Col>
          <Col style={styles.center}>
            <Icon
              name="headphones"
              size={28}
              style={styles.icon}
              onPress={this.props.onListPress}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Footer;
