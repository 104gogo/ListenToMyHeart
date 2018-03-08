# listenToMyHeart

## 安装
```
yarn
```

## 运行
打开xcode，点击run按钮

## 真机打包
1. 先在项目中打包
```
npm run build
```
2. Product -> Scheme -> Edit Scheme -> Build Configuration 选择 release

3. 修改ios/RNPro/AppDelegate.m
```
// 模拟器测试
//   jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  
// 打包手机测试,改成访问本地的js服务器
jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"bundles/main" withExtension:@"jsbundle"];

```
更多的环境变量已经在xcode中进行了配置
4. 最后，点击运行

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

### App Transport Security
App Transport Security(简称ATS)是iOS 9中新增的一项安全特性。在默认设置下，只允许HTTPS的请求，而所有HTTP的请求都会被拒绝
解决办法：[RN 直接在 HTTP 协议下GET/POST](https://www.jianshu.com/p/5be468c1712f?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation)