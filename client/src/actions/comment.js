import superagent from 'superagent';

const postComment = comment => ({
  type: 'COMMENTS_POST',
  payload: comment,
});

const updateComment = comment => ({
  type: 'COMMENTS_UPDATE',
  payload: comment,
});

const getComments = comments => ({
  type: 'COMMENTS_GET',
  payload: comments,
});

const deleteComment = comment => ({
  type: 'COMMENTS_DELETE',
  payload: comment,
});

const postCommentRequest = comment => (store) => {
  return superagent.post(`${API_URL}/api/comments`)
    .send(comment)
    .then((response) => {
      return store.dispatch(postComment(response.body))
    })
};

const updateCommentRequest = comment => (store) => {
  return superagent.put(`${API_URL}/api/comments/${comment._id}`)
    .send(comment)
    .then((response) => {
      return store.dispatch(updateComment(response.body));
    });
};

const getCommentsRequest = () => (store) => {
  return superagent.get(`${API_URL}/api/comments`)
    .then((response) => {
      return store.dispatch(getComments(response.body));
    });
};

const getCompletedCommentsRequest = () => (store) => {
  return superagent.get(`${API_URL}/api/comments/completed`)
    .then((response) => {
      return store.dispatch(getComments(response.body));
    });
};

const deleteCommentRequest = comment => (store) => {
  return superagent.del(`${API_URL}/api/comments/${comment._id}`)
    .then(() => {
      return store.dispatch(deleteComment(comment))
    })
};

export default {
  postCommentRequest,
  updateCommentRequest,
  getCommentsRequest,
  getCompletedCommentsRequest,
  deleteCommentRequest,
}
