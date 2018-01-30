import * as winston from 'winston';
import * as fs from 'fs';
import * as rotate from 'winston-daily-rotate-file';
import config from '../config';

const dir = config.logFileDir;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const logger = new winston.Logger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      colorize: true,
    }),
    new winston.transports.DailyRotateFile({
      filename: config.logFileName,
      dirname: config.logFileDir,
      maxsize: 20971520, // 20MB
      maxFiles: 5,
      datePattern: '.dd-MM-yyyy',
    }),
  ],
});

export default logger;
