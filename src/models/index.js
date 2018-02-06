import login from './login';
import router from './router';

export default (app) => {
  app.model(login);
  app.model(router);
};
