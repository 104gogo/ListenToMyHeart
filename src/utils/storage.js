import { AsyncStorage } from 'react-native';

// __DEV__ && AsyncStorage.clear();

const get = key => AsyncStorage.getItem(key)
  .then(value => JSON.parse(value))
  .catch((e) => {
    console.log(e);
    return null;
  });

const set = (key, value) => AsyncStorage.setItem(key, JSON.stringify(value)).catch(e => console.log(e));

export default {
  get,
  set,
};

