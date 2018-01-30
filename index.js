import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import connectToDb from './db';
import logger from './core/logger';
import routes from './routes';

require('dotenv').config();

logger.stream = {
  write(message) {
    logger.info(message);
  },
};

connectToDb();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev', { stream: logger.stream }));

app.use('/', routes);
app.use('/*', (req, res) => {
  res.json({ message: 'Oops!!! 404 Error!! No API available!' });
});

app.listen(process.env.PORT || 5000, () => {
  logger.info(`Server started at port ${process.env.PORT}`);
});
