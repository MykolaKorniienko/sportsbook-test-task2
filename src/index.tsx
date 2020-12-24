import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { createBrowserHistory } from 'history';
import { configureStore } from './store';
import { Home } from './containers/Home';
import { Login } from './containers/Login';

const store = configureStore();
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/login" >
          <Login />
        </Route>
        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

function PrivateRoute(props: { path:String, children: any }) {
  let auth = localStorage.getItem('authToken');
  return (
    <Route
      render={() =>
        auth ? (
          props.children
        ) : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )
      }
    />
  );
}
