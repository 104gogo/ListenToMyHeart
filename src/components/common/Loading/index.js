const loading = {};
let timer = null;
const delay = 300;

export default {
  set(func) {
    if (loading.cb) {
      return;
    }
    Object.defineProperty(loading, 'cb', {
      value: func,
      writable: false
    });
  },
  show() {
    // 针对loading延迟
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      loading.cb(true);
      clearTimeout(timer);
      timer = null;
    }, delay);
  },
  hide() {
    loading.cb(false);
    timer && clearTimeout(timer);
  }
};
