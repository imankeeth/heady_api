'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _products = require('../controllers/products.controller');

var _products2 = _interopRequireDefault(_products);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var productsRoute = (0, _express.Router)();
var productRoute = (0, _express.Router)();

// Get all products
productsRoute.get('/', function (req, res) {
  _products2.default.getAllProducts(req, res);
});

productRoute.post('/', function (req, res) {
  // Add Product mapped to a category or categories.
  _products2.default.addProduct(req, res);
}).put('/:product_id', function (req, res) {
  // Update product details (name,price,etc)
  _products2.default.updateProductDetails(req, res);
});

exports.default = { productsRoute: productsRoute, productRoute: productRoute };