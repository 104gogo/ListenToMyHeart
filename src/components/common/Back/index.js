// 返回键组件 增加接触面 提高体验
import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

const style = {
  fontSize: 45,
  paddingLeft: 10,
  color: '#fff',
};

class Back extends PureComponent {
  constructor(props) {
    super(props);
    this.onBackPress = this.onBackPress.bind(this);
  }

  onBackPress() {
    const { navigation, onPress } = this.props;
    onPress && onPress();
    navigation.goBack();
  }

  render() {
    return (
      <Icon
        name="angle-left"
        size={30}
        style={style}
        onPress={this.onBackPress}
      />
    );
  }
}

export default withNavigation(Back);
