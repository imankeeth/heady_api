'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {};

config.logFileDir = _path2.default.join(__dirname, '../../log');
config.logFileName = 'app.log';

exports.default = config;