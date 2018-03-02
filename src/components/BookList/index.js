import React, { PureComponent } from 'react';
import {
  Container, Header, Content, Text,
  List, ListItem, Thumbnail, Body,
} from 'native-base';

import style from './style';
import images from '../../themes/images';

export default class BookList extends PureComponent {
  toChapterDetail(id) {
    this.props.navigation.navigate('ChapterDetail', { id });
  }

  render() {
    const { books } = this.props;

    return (
      <Container>
        <Header style={style.header}>
          <Text style={style.headerText}>听书神器</Text>
        </Header>
        <Content>
          <List
            style={style.list}
            dataArray={books}
            renderRow={({ _id, title, lastChapter }) =>
              <ListItem thumbnail onPress={() => this.toChapterDetail(_id)}>
                <Thumbnail square size={80} source={images.headImg} />
                <Body>
                  <Text>{title}</Text>
                  <Text note>{lastChapter}</Text>
                </Body>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

