'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';
import Comment from '../models/comment';

const jsonParser = json();
const commentRouter = new Router();

commentRouter.post('/comments', jsonParser, (req, res, next) => {
  if (!req.body.text || !req.body.author) {
    return next(new HttpError(400, 'COMMENT POST - text or author undefined'));
  }
  return new Comment(req.body).save()
    .then((comment) => {
      if (!comment) return next(new HttpError(400, 'COMMENT POST - error creating comment'));
      return res.json(comment);
    })
    .catch(next);
});

commentRouter.get('/comments', (req, res, next) => {
  return Comment.find({ completed: false })
    .then((comments) => {
      if (!comments) return next(new HttpError(400, 'COMMENT GET - error fetching comments'));
      return res.json(comments);
    })
    .catch(next);
});

commentRouter.get('/comments/completed', (req, res, next) => {
  return Comment.find({ completed: true })
    .then((comments) => {
      if (!comments) {
        return next(new HttpError(400, 'COMMENT GET COMPLETED - error fetching comments'));
      }
      return res.json(comments);
    })
    .catch(next);
});

commentRouter.put('/comments/:id', jsonParser, (req, res, next) => {
  const options = { returnNewDocument: true };
  return Comment.findOneAndUpdate({ _id: req.params.id }, req.body, options)
    .then((comment) => {
      if (!comment) return next(new HttpError(400, 'COMMENT UPDATE - error updating comment'));
      return res.json(comment);
    })
    .catch(next);
});

commentRouter.delete('/comments/:id', (req, res, next) => {
  return Comment.findOneAndDelete({ _id: req.params.id })
    .then(() => {
      return res.sendStatus(204);
    })
    .catch(next);
});

export default commentRouter;
