import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#1e1e1e',
    width: '100%',
    height: 65,
    zIndex: 10,
  },
  icon: {
    width: 30,
    height: 30,
    color: '#fff',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
