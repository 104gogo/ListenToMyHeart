import { NativeModules } from 'react-native';

const transformUrl = (params = {}) =>
  Object.keys(params).reduce((arr, key) => {
    arr.push(`${key}=${params[key]}`);
    return arr;
  }, []).join('&');

export function get(url, params) {
  return new Promise((resolve) => {
    NativeModules.RNRequest.get(`${url}${params ? '?' : ''}${transformUrl(params)}`, resolve);
  });
}

