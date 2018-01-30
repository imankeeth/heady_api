'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _categories = require('./categories');

var _categories2 = _interopRequireDefault(_categories);

var _products = require('./products');

var _products2 = _interopRequireDefault(_products);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = (0, _express.Router)();

routes.use('/categories', _categories2.default.categoriesRoute);
routes.use('/category', _categories2.default.categoryRoute);

routes.use('/products', _products2.default.productsRoute);
routes.use('/product', _products2.default.productRoute);

routes.get('/', function (req, res) {
  res.json({ message: "Welcome to Heady's backend API" });
});

exports.default = routes;