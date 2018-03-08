import { StyleSheet, PixelRatio } from 'react-native';

export default StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10,
    width: 50,
    height: 50,
  },
  line: {
    paddingLeft: 15,
    paddingVertical: 5,
    borderStyle: 'solid',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#dfdfdf',
  },
  text: {
    fontSize: 18,
    color: '#1f2533',
  },
});
