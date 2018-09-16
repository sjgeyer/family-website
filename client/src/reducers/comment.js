export default (state = [], { type, payload }) => {
  switch (type) {
    case 'COMMENTS_POST':
      return [payload, ...state];
    case 'COMMENTS_UPDATE':
      return state.map(comment => (comment._id === payload._id ? payload : comment));
    case 'COMMENTS_DELETE':
      return state.filter(comment => comment._id !== payload._id);
    case 'COMMENTS_GET':
      return payload;
    case 'TOKEN_REMOVE':
      return [];
    default:
      return state;
  }
};
