import React from 'react';
import dva from 'dva-no-router';
import registerModels from './models';
import Router from './Router';

// 1. Initialize
const app = dva({
  onError(e) {
    console.log(e);
  }
});

// 2. Model
registerModels(app);

// 3. Router
app.router(() => <Router />);

// 4. Start
export default () => app.start();
