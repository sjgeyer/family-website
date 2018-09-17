import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import commentActions from '../../actions/comment';
import autobind from '../../utils/autobind';

const dateFromDateString = (date) => {
  const splitDate = date.slice(0, 10).split('-').map(string => Number(string));
  return `${splitDate[1]}-${splitDate[2]}-${splitDate[0]}`;
};

class Comment extends React.Component {
  constructor(props) {
    super(props);
    autobind.call(this, Comment);
  }

  handleMarkComplete() {
    return this.props.markCommentComplete({
      ...this.props.comment,
      completed: true,
      dateCompleted: new Date(),
    });
  }

  render() {
    const { comment } = this.props;
    return (
      <div className='comment-list-item'>
        <p>{ comment.author }: { comment.text }</p>
        <p>Created on: { dateFromDateString(comment.dateCreated) }</p>
        <button onClick={this.handleMarkComplete}>Mark As Completed</button>
      </div>
    );
  }
}

Comment.propTypes = {
  markCommentComplete: PropTypes.func,
  comment: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  markCommentComplete: comment => dispatch(commentActions.updateCommentRequest(comment))
});

export default connect(null, mapDispatchToProps)(Comment);
