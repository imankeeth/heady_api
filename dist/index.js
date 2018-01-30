'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _logger = require('./core/logger');

var _logger2 = _interopRequireDefault(_logger);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

_logger2.default.stream = {
  write: function write(message) {
    _logger2.default.info(message);
  }
};

(0, _db2.default)();
var app = (0, _express2.default)();

app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _morgan2.default)('dev', { stream: _logger2.default.stream }));

app.use('/', _routes2.default);
app.use('/*', function (req, res) {
  res.json({ message: 'Oops!!! 404 Error!! No API available!' });
});

app.listen(process.env.PORT || 5000, function () {
  _logger2.default.info('Server started at port ' + process.env.PORT);
});