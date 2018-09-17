import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from '../../utils/routes';
import commentActions from '../../actions/comment';
import autobind from '../../utils/autobind';

import CommentForm from '../comment-form/CommentForm.jsx';
import Comment from '../comment/Comment.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
    autobind.call(this, Home);
  }

  componentDidMount() {
    try {
      this.props.getComments();
    } catch (err) {
      this.handleError();
    }
  }

  handleError() {
    this.setState({ error: true });
  }

  render() {
    const { comments, submitComment } = this.props;
    const uncompletedComments = comments
      .filter(comment => !comment.completed)
      .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
    return (
      <React.Fragment>
        <CommentForm onComplete={submitComment}/>
        <h2>Active Issues</h2>
        { this.state.error && <p className='error'>Oops! Something went wrong!</p> }
        {
          uncompletedComments.length
            ? uncompletedComments.map((comment, i) => <Comment comment={comment} key={i}/>)
            : <p>No comments to display</p>
        }
        <Link to={routes.COMPLETED_COMMENTS}>View Completed Issues</Link>
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  comments: PropTypes.array,
  submitComment: PropTypes.func,
  getComments: PropTypes.func,
};

const mapStateToProps = state => ({
  comments: state.comments,
});

const mapDispatchToProps = dispatch => ({
  submitComment: comment => dispatch(commentActions.postCommentRequest(comment)),
  getComments: () => dispatch(commentActions.getCommentsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
