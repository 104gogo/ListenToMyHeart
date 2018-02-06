import React, { PureComponent } from 'react';
import {
  Container, Header, Content, Text,
  List, ListItem, Thumbnail, Body,
  Footer, FooterTab, Button, Icon
} from 'native-base';
import style from './style';
import images from '../../themes/images';
import StyleProvider from '../common/StyleProvider';

export default class UserManage extends PureComponent {
  constructor(props) {
    super(props);
    this.onItemPress = this.onItemPress.bind(this);
  }

  onItemPress(details) {
    this.props.navigation.navigate('UserDetails', { details });
  }

  render() {
    const { dataArray } = this.props;
    return (
      <StyleProvider>
        <Container>
          <Header style={style.header}>
            <Text>用户管理</Text>
          </Header>
          <Content>
            <List
              style={style.list}
              dataArray={dataArray}
              renderRow={item =>
                <ListItem thumbnail onPress={() => this.onItemPress(item)}>
                  <Thumbnail square size={80} source={images.headImg} />
                  <Body>
                    <Text>Sankhadeep</Text>
                    <Text note>Its time to build a difference . .</Text>
                  </Body>
                </ListItem>}
            />
          </Content>
          <Footer>
            <FooterTab>
              <Button>
                <Icon name="apps" />
              </Button>
              <Button>
                <Icon name="camera" />
              </Button>
              <Button active>
                <Icon active name="navigate" />
              </Button>
              <Button>
                <Icon name="person" />
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </StyleProvider>
    );
  }
}

UserManage.defaultProps = {
  dataArray: new Array(10).fill(1010)
};

