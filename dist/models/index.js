'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _categories = require('./categories.model');

var _categories2 = _interopRequireDefault(_categories);

var _products = require('./products.model');

var _products2 = _interopRequireDefault(_products);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { Categories: _categories2.default, Products: _products2.default };