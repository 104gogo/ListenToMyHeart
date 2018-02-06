import router from './router';
import bookList from './bookList';

export default (app) => {
  app.model(router);
  app.model(bookList);
};
