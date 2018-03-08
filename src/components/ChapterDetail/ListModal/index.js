import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Modal from 'react-native-modalbox';

import styles from './styles';

export default class ListModal extends PureComponent {
  constructor() {
    super();

    this.close = this.close.bind(this);
  }

  open() {
    this.modal.open();
  }

  close() {
    this.modal.close();
  }

  render() {
    const { chapters } = this.props;

    return (
      <Modal
        ref={modal => this.modal = modal}
        style={styles.modal}
        swipeToClose={false}
        onClosed={() => {}}
        onOpened={() => {}}
        onClosingState={() => {}}
      >
        <ScrollView>
          {
            chapters.map(({ title }, index) =>
              <TouchableWithoutFeedback key={index} onPress={() => this.props.onTitlePress(index)}>
                <View style={styles.line}>
                  <Text style={styles.text}>{title}</Text>
                </View>
              </TouchableWithoutFeedback>
            )
          }
        </ScrollView>
        <Button
          onPress={this.close}
          style={styles.btn}
          title="X"
        />
      </Modal>
    );
  }
}
