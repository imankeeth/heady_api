'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _logger = require('../core/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = require('bluebird');

var connectToDb = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var dbUname, dbPwd, dbHost, dbPort, dbName;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dbUname = process.env.DB_USERNAME || '';
            dbPwd = process.env.DB_PWD || '';
            dbHost = process.env.DB_HOST || 'localhost';
            dbPort = process.env.DB_PORT || '27017';
            dbName = process.env.DB_NAME || 'heady_apis';
            _context.prev = 5;
            _context.next = 8;
            return _mongoose2.default.connect('mongodb://' + dbUname + ':' + dbPwd + '@' + dbHost + ':' + dbPort + '/' + dbName);

          case 8:
            _logger2.default.info('Connected to mongo!!!');
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](5);

            _logger2.default.error('Could not connect to MongoDB!!');

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[5, 11]]);
  }));

  return function connectToDb() {
    return _ref.apply(this, arguments);
  };
}();

exports.default = connectToDb;