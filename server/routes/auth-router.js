'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';

const jsonParser = json();
const authRouter = new Router();

authRouter.post('/login', jsonParser, (req, res, next) => {
  if (!req.body.password) {
    return next(new HttpError(400, 'AUTH ROUTER - password undefined'));
  }
  if (req.body.password !== process.env.FAMILY_PASSWORD) {
    console.log('PASSWORD', process.env.FAMILY_PASSWORD);
    return next(new HttpError(400, 'AUTH ROUTER - password incorrect'));
  }
  return res
    .cookie('efw-token', process.env.FAMILY_TOKEN)
    .send({ token: process.env.FAMILY_TOKEN });
});

export default authRouter;
