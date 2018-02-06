import React, { PureComponent } from 'react';
import {
  Container, Header, Content, Text,
  List, ListItem, Thumbnail, Body,
} from 'native-base';

import style from './style';
import images from '../../themes/images';
import StyleProvider from '../common/StyleProvider';

export default class BookList extends PureComponent {
  render() {
    const { books } = this.props;
console.log('books', books);
    return (
      <StyleProvider>
        <Container>
          <Header style={style.header}>
            <Text style={style.headerText}>听书神器</Text>
          </Header>
          <Content>
            <List
              style={style.list}
              dataArray={books}
              renderRow={({ title, lastChapter }) =>
                <ListItem thumbnail>
                  <Thumbnail square size={80} source={images.headImg} />
                  <Body>
                    <Text>{title}</Text>
                    <Text note>{lastChapter}</Text>
                  </Body>
                </ListItem>}
            />
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

