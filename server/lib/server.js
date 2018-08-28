'use strict';

import express from 'express';
import mongoose from 'mongoose';

import logger from './logger';
import loggerMiddleware from './logger-middleware';
import errorMiddleware from './error-middleware';
import commentRouter from '../routes/comment-router';

const app = express();
let server = null;
require('dotenv').config();

// ... other app.use middleware setups
app.use(loggerMiddleware);
app.use(express.static(`${__dirname}/../../client/build`));
app.use('/api', commentRouter);
app.use(errorMiddleware);

// Right before your app.listen(), add this:
app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/../../client/build/index.html`);
});
// -----

const startServer = () => {
  return mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
      server = app.listen(process.env.PORT, () => {
        logger.log(logger.INFO, `SERVER IS LISTENING ON PORT ${process.env.PORT}`);
      });
    })
    .catch((err) => {
      logger.log(logger.ERROR, `SERVER START ERROR ${JSON.stringify(err)}`);
    });
};

const stopServer = () => {
  return mongoose.disconnect()
    .then(() => {
      server.close(() => {
        logger.log(logger.INFO, 'SERVER IS OFF');
      });
    })
    .catch((err) => {
      logger.log(logger.ERROR, `STOP SERVER ERROR, ${JSON.stringify(err)}`);
    });
};

export { startServer, stopServer };
