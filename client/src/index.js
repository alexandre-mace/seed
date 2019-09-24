import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';
import { Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import {
  ConnectedRouter,
  connectRouter,
  routerMiddleware
} from 'connected-react-router';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import './app.scss';
import * as serviceWorker from './serviceWorker';
// Import your reducers and routes here
import Welcome from './Welcome';
import user from './reducers/user/';
import project from './reducers/project/';
import topic from './reducers/topic/';
import message from './reducers/message/';
import userRoutes from './routes/user';
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import InfoPage from "./pages/InfoPage.jsx";
import HelpPage from "./pages/HelpPage.jsx";
import messageRoutes from "./routes/message";
import topicRoutes from "./routes/topic";
import projectRoutes from "./routes/project";

const history = createBrowserHistory();
const store = createStore(
  combineReducers({
    router: connectRouter(history),
    form,
      user,
      project,
      message,
      topic
    /* Add your reducers here */
  }),
  applyMiddleware(routerMiddleware(history), thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/welcome" component={Welcome} strict={true} exact={true}/>
          { userRoutes }
          { messageRoutes }
          { topicRoutes }
          { projectRoutes }
          <Route path="/se-connecter" component={LoginPage} strict={true} exact={true} />
          <Route path="/info" component={InfoPage} strict={true} exact={true} />
          <Route path="/help" component={HelpPage} strict={true} exact={true} />
        <Route path="/" component={HomePage} strict={true} exact={true} />
          <Route render={() => <h1>Not Found</h1>} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
