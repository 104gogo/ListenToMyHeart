import React from 'react';
import { StyleProvider as BaseStyleProvider } from 'native-base';
import getTheme from '../../../themes/nativeBaseCustomize/components';
import commonColor from '../../../themes/nativeBaseCustomize/variables/commonColor';

const StyleProvider = ({ children }) =>
  <BaseStyleProvider style={getTheme(commonColor)}>
    { children }
  </BaseStyleProvider>;

export default StyleProvider;
