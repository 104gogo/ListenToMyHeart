import React, { PureComponent } from 'react';
import { Image } from 'react-native';
import {
  Container, Header, Text,
  Thumbnail, Card, CardItem, Left,
  Body, Icon
} from 'native-base';
// https://github.com/leecade/react-native-swiper
import Swiper from 'react-native-swiper';
import style from './style';
import images from '../../themes/images';
import StyleProvider from '../common/StyleProvider';

export default class UserManage extends PureComponent {
  constructor(props) {
    super(props);
    this.onBackPress = this.onBackPress.bind(this);
  }

  onBackPress() {
    this.props.navigation.goBack();
  }

  render() {
    const { dataSource } = this.props;
    return (
      <StyleProvider>
        <Container>
          <Header style={style.header}>
            <Left>
              <Icon name="arrow-back" onPress={this.onBackPress} />
            </Left>
            <Body>
              <Text>用户信息</Text>
            </Body>
          </Header>
          <Swiper
            showsPagination={false}
          >
            {
              dataSource.map((item, index) =>
                <Card key={index}>
                  <CardItem>
                    <Left>
                      <Thumbnail source={item.image} />
                      <Body>
                        <Text>{item.text}</Text>
                        <Text note>NativeBase</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem cardBody>
                    <Image style={style.image} source={item.image} />
                  </CardItem>
                  <CardItem>
                    <Icon name="heart" style={style.icon} />
                    <Text>{item.name}</Text>
                  </CardItem>
                </Card>
              )
            }
          </Swiper>
        </Container>
      </StyleProvider>
    );
  }
}

UserManage.defaultProps = {
  dataSource: [
    {
      text: 'Card One',
      name: 'One',
      image: images.demoInfo1,
    },
    {
      text: 'Card Two',
      name: 'Two',
      image: images.demoInfo2,
    },
    {
      text: 'Card Three',
      name: 'Three',
      image: images.demoInfo3,
    },
    {
      text: 'Card Four',
      name: 'Four',
      image: images.demoInfo4,
    }
  ]
};
