'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _categories = require('../controllers/categories.controller');

var _categories2 = _interopRequireDefault(_categories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var categoriesRoute = (0, _express.Router)();
var categoryRoute = (0, _express.Router)();

// Get all categories with all its child categories mapped to it.
categoriesRoute.get('/', function (req, res) {
  _categories2.default.getAllCategories(req, res);
});

categoryRoute.post('/', function (req, res) {
  // Add a new category
  _categories2.default.addCategory(req, res);
}).get('/:category_id', function (req, res) {
  // Get a category by ID
  _categories2.default.getSingleCategoryById(req, res);
}).get('/:category_id/products', function (req, res) {
  // Get all products by a category.
  _categories2.default.findProductsByCategory(req, res);
});

exports.default = { categoriesRoute: categoriesRoute, categoryRoute: categoryRoute };