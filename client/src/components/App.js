import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from './header/Header.jsx';
import AuthRedirect from './auth-redirect/AuthRedirect.jsx';
import Home from './home/Home.jsx';
import Landing from './landing/Landing.jsx';
import Loading from './loading/Loading.jsx';
import routes from '../utils/routes';

import '../App.css';

class App extends Component {
  render() {
    console.log('logged in?', this.props.loggedIn);
    return (
      <div className="app">
        <BrowserRouter>
          <React.Fragment>
            { this.props.loggedIn && <Header/> }
            <Route path='*' component={AuthRedirect}/>
            <Route exact path={routes.LANDING} component={Landing}/>
            <Route exact path={routes.HOME} component={Home}/>
            <Route exact path={routes.LOGOUT} component={Loading}/>
            {/* <Route exact path='/calendar' component={}/> */}
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

App.propTypes = {
  loggedIn: PropTypes.bool,
};

const mapStateToProps = state => ({
  loggedIn: !!state.token,
});

export default connect(mapStateToProps)(App);
