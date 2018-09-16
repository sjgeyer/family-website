import { combineReducers } from 'redux';

import comments from './comment';
import token from './token';

export default combineReducers({
  comments,
  token,
});
