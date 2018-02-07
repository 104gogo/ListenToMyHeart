import router from './router';
import bookList from './bookList';
import chapterDetail from './chapterDetail';

export default (app) => {
  app.model(router);
  app.model(bookList);
  app.model(chapterDetail);
};
