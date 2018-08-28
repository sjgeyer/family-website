'use strict';

import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: () => new Date(),
  },
  completed: {
    type: Boolean,
    default: false,
  },
  author: {
    type: String,
    required: true,
  },
  dateCompleted: {
    type: Date,
  },
});

export default mongoose.model('comment', commentSchema);
