import bookList from './bookList';
import router from './router';

export default (app) => {
  app.model(bookList);
  app.model(router);
};
