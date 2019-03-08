import React, { Component } from 'react';
import {LoginPage, SignUpPage, NotFoundPage, ProfilePage} from './pages';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import PrivateRouter from './router/PrivateRouter';
// import Bootstrap from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div>
        <Router basename="/panel">
          <Switch>
            <Route path="/login" component={LoginPage}/>
            <Route path="/signup" component={SignUpPage}/>
            <PrivateRouter path="/profile" component={ProfilePage}/>
            <Route component={NotFoundPage}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
