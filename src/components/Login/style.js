import { StyleSheet } from 'react-native';
import platform from '../../themes/nativeBaseCustomize/variables/platform';

export default StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: '#FEF100'
  },
  codeBtn: {
    height: platform.inputHeightBase,
  },
  loginBtn: {
    marginTop: 40
  }
});
