import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './header/Header.jsx';
import AuthRedirect from './auth-redirect/AuthRedirect.jsx';
import Home from './home/Home.jsx';
import Landing from './landing/Landing.jsx';

import '../App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <React.Fragment>
            <Header/>
            <Route path='*' component={AuthRedirect}/>
            <Route exact path='/' component={Landing}/>
            <Route exact path='/home' component={Home}/>
            {/* <Route exact path='/calendar' component={}/> */}
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
