import React, { PureComponent } from 'react';
import { Image, NativeModules } from 'react-native';
import {
  Container, Header, Content, Button, Icon, Text,
  Item, Input
} from 'native-base';
import Sound from 'react-native-sound';

import style from './style';
import images from '../../themes/images';
import StyleProvider from '../common/StyleProvider';

export default class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.onLoginPress = this.onLoginPress.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount')
    NativeModules.RNTest.requestUrl((url) => {
      console.log('url', url);
      const s = new Sound(url, null, (e) => {
        if (e) {
          console.log('播放失败');
          return;
        }
        s.play(() => s.release());
      });
    });
  }

  onLoginPress() {
    this.props.navigation.navigate('UserManage');
  }

  render() {
    const { code, codeBtnDisabled, loginBtnDisabled, onCodePress } = this.props;
    return (
      <StyleProvider>
        <Container>
          <Header style={style.header}>
            <Image source={images.logo} />
          </Header>

          <Content padder>
            <Item>
              <Icon active name="phone-portrait" />
              <Input placeholder="13800000000" />
            </Item>
            <Item>
              <Icon active name="lock" />
              <Input value={code} />
              <Button
                info
                style={style.codeBtn}
                disabled={codeBtnDisabled}
                onPress={onCodePress}
              ><Text> 获取验证码 </Text></Button>
            </Item>

            <Button
              full
              style={style.loginBtn}
              disabled={loginBtnDisabled}
              onPress={this.onLoginPress}
            ><Text> 登录 </Text></Button>
          </Content>

        </Container>
      </StyleProvider>
    );
  }
}

