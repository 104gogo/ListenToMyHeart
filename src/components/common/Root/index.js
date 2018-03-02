import React, { PureComponent } from 'react';
import { View, Modal, ActivityIndicator } from 'react-native';
import Loading from '../Loading';

import styles from './styles';


export default class Root extends PureComponent {
  state = {
    loadingVisible: false,
  };

  componentDidMount() {
    Loading.set(value => this.setState({ loadingVisible: value }));
  }

  render() {
    const { loadingVisible } = this.state;

    return (
      <View style={{ flex: 1 }}>
        {this.props.children}
        <Modal
          transparent
          visible={loadingVisible}
        >
          <View style={styles.wrapper}>
            <ActivityIndicator
              animating={loadingVisible}
              color="white"
              size="large"
              hidesWhenStopped
            />
          </View>
        </Modal>
      </View>
    );
  }
}
