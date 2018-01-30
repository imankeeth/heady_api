import Mongoose from 'mongoose';
import logger from '../core/logger';

Mongoose.Promise = require('bluebird');

const connectToDb = async () => {
  const dbUname = process.env.DB_USERNAME || '';
  const dbPwd = process.env.DB_PWD || '';
  const dbHost = process.env.DB_HOST || 'localhost';
  const dbPort = process.env.DB_PORT || '27017';
  const dbName = process.env.DB_NAME || 'heady_apis';
  try {
    await Mongoose.connect(`mongodb://${dbUname}:${dbPwd}@${dbHost}:${dbPort}/${dbName}`);
    logger.info('Connected to mongo!!!');
  } catch (err) {
    logger.error('Could not connect to MongoDB!!');
  }
};

export default connectToDb;
