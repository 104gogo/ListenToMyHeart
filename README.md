# listenToMyHeart

## 安装
```
yarn
cd ios && pod install
```

## 运行
打开xcode，点击run按钮

## 踩的坑
### RCTBridgeModule.h is not found
```
#import <RCTBridgeModule.h> // RCTBridgeModule.h is not found
```
最新的写法是
```
#import <React/RCTBridgeModule.h>
```

### Unhandled JS Exception: undefined is not an object (evaluating 'RNSound.IsAndroid')
播放音频文件使用了 `react-native-sound` 第三方库，它是js和原生混编的，需要link一下
```
yarn add react-native-sound
react-native link react-native-sound
```
但是执行了上面的操作还是报错，我是通过[手动link](https://facebook.github.io/react-native/docs/linking-libraries-ios.html#manual-linking)来解决的