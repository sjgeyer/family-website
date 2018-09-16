import React from 'react';
import PropTypes from 'prop-types';
import autobind from '../../utils/autobind';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
    };
    autobind.call(this, LoginForm);
  }

  handleChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {

  }

  render() {
    return (
      <React.Fragment>
        <h2>Please enter the password</h2>
        <form className='login-form' onSubmit={this.handleSubmit}>
          <input
            name='password'
            placeholder='Enter password...'
            type='password'
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button type='submit'>Submit</button>
        </form>
      </React.Fragment>
    );
  }
}

LoginForm.propTypes = {
  onComplete: PropTypes.func,
};

export default LoginForm;
