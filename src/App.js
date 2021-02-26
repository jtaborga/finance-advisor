import React from 'react';
import { Provider } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';

import { createBrowserHistory as createHistory } from 'history';
import routes from './constants/routes';

import store from './store';
import './App.css';

const history = createHistory();

const App = () => {
    return (
        <Provider store={store} >
          <Router history={history}>
            <div className="App">
              <Switch>
                {Object.values(routes).map((route) => (
                  <Route
                    exact
                    key={route.path}
                    path={route.path}
                    component={route.component}
                    history={history}
                  />
                ))}
              </Switch>
            </div>
          </Router>
        </Provider>
    );
  }

export default App;
