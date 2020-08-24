import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import CredentialsForm from './components/CredentialsForm/CredentialsForm'
import AuthSuperUser from './components/AuthSuperUser/AuthSuperUser'

import 'bootstrap/dist/css/bootstrap.min.css';
/**
 * const headers = {
      'Content-Type': 'application/json',
      'authorization': 'JWT fefege...'
    }
 */

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/' component={AuthSuperUser} exact/>
          <Route path='/CredentialsForm' component={CredentialsForm} exact/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
