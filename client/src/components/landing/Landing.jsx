import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import autobind from '../../utils/autobind';
import LoginForm from '../login-form/LoginForm.jsx';
import { loginRequest } from '../../actions/auth';
import routes from '../../utils/routes';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage: 'Oops! Something went wrong. Please try again.',
    };
    autobind.call(this, Landing);
  }

  handleLogin(password) {
    return this.props.login(password)
      .then(() => {
        this.props.history.push(routes.HOME);
      })
      .catch((error) => {
        this.setState({ error: true });
        if (error.status === 400) {
          this.setState({ errorMessage: 'Password incorrect. Please try again.' });
        }
        setTimeout(() => this.setState({ error: false }), 1500);
      });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Please enter the password</h1>
        <LoginForm onComplete={this.handleLogin}/>
        { this.state.error && <p className='error'>{this.state.errorMessage}</p> }
      </React.Fragment>
    );
  }
}

Landing.propTypes = {
  login: PropTypes.func,
  loggedIn: PropTypes.bool,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  loggedIn: !!state.token,
});

const mapDispatchToProps = dispatch => ({
  login: password => dispatch(loginRequest(password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
