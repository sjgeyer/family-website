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
    e.preventDefault();
    this.props.onComplete(this.state.password);
    this.setState({ password: '' });
  }

  render() {
    return (
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
    );
  }
}

LoginForm.propTypes = {
  onComplete: PropTypes.func,
};

export default LoginForm;
