//External Dependencies
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

//Internal Dependencies
import  Layout from './components/layout/layout';
import Login from './components/user_auth/login';
import Overview from './components/overview/overview';

const App = (props) => (
  <Router history={ browserHistory }>
    <Route path='/' component={ Layout }>
      <IndexRoute component={ Login } />
      <Route path='login' component={ Login } />
      <Route path='overview' component={ Overview } />      
    </Route>
  </Router>
);

export default App;
