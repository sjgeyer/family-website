import React from 'react';
import PropTypes from 'prop-types';

import autobind from '../../utils/autobind';

const defaultState = {
  author: '',
  text: '',
  error: false,
};

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autobind.call(this, CommentForm);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete({
      author: this.state.author,
      text: this.state.text,
    });
    this.setState(defaultState);
  }

  render() {
    return (
      <form className='comment-form' onSubmit={this.handleSubmit}>
        <input
          type='text'
          placeholder='Enter your name...'
          name='author'
          value={this.state.author}
          onChange={this.handleChange}
        />
        <textarea
          placeholder='Enter your comment...'
          name='text'
          value={this.state.text}
          onChange={this.handleChange}
        />
        <button type='submit'>Submit</button>
      </form>
    );
  }
}

CommentForm.propTypes = {
  comment: PropTypes.object,
  onComplete: PropTypes.func,
};

export default CommentForm;
