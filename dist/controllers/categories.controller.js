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

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _logger = require('../core/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Categories = _models2.default.Categories;

var categoriesController = {};

categoriesController.addCategory = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var _req$body, name, _req$body$parent_cate, parent_category, new_category, parent;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, _req$body$parent_cate = _req$body.parent_category, parent_category = _req$body$parent_cate === undefined ? null : _req$body$parent_cate;
            _context.prev = 1;
            new_category = new Categories({
              _id: new _mongoose2.default.Types.ObjectId(),
              name: name,
              parent_category: parent_category
            });
            _context.next = 5;
            return new_category.save();

          case 5:
            _context.prev = 5;

            if (!parent_category) {
              _context.next = 15;
              break;
            }

            _context.next = 9;
            return Categories.findById(parent_category);

          case 9:
            parent = _context.sent;
            _context.next = 12;
            return parent.child_categories.push(new_category['_id']);

          case 12:
            _context.next = 14;
            return parent.save();

          case 14:
            _logger2.default.info('Child category linked to parent');

          case 15:
            _context.next = 21;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context['catch'](5);

            _logger2.default.error('Unable to link child category with parent');
            return _context.abrupt('return', res.status(409).send({ status: 'Unsuccessful', error: _context.t0 }));

          case 21:
            _logger2.default.info('Adding a category');
            return _context.abrupt('return', res.status(201).send({ status: 'Successful', categories: new_category['_doc'] }));

          case 25:
            _context.prev = 25;
            _context.t1 = _context['catch'](1);
            return _context.abrupt('return', res.status(409).send({ status: 'Unsuccessful', error: _context.t1 }));

          case 28:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 25], [5, 17]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

categoriesController.getAllCategories = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var categories;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return Categories.find().populate({ path: 'parent_category', select: 'name _id' }).populate({ path: 'child_categories', select: 'name _id' }).populate({ path: 'products', select: 'name _id' }).exec();

          case 3:
            categories = _context2.sent;

            _logger2.default.info('Sending all categories');
            return _context2.abrupt('return', res.status(200).send({ status: 'Successful', categories: categories }));

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2['catch'](0);

            _logger2.default.error('Error sending all categories: ', _context2.t0);
            return _context2.abrupt('return', res.status(404).send({ status: 'Unsuccessful', error: _context2.t0 }));

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 8]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

categoriesController.getSingleCategoryById = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    var category_id, category;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            category_id = req.params.category_id;
            _context3.next = 4;
            return Categories.findById(category_id).populate({ path: 'parent_category', select: 'name _id' }).populate({ path: 'child_categories', select: 'name _id' }).populate({ path: 'products', select: 'name _id' }).exec();

          case 4:
            category = _context3.sent;
            return _context3.abrupt('return', res.status(200).send({ status: 'Successful', category: category }));

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3['catch'](0);
            return _context3.abrupt('return', res.status(404).send({ status: 'Unsuccessful', error: _context3.t0 }));

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 8]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

categoriesController.findProductsByCategory = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
    var category_id, _ref5, products;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            category_id = req.params.category_id;
            _context4.next = 4;
            return Categories.findOne({ _id: category_id }).populate({ path: 'products' }).select('products -_id').exec();

          case 4:
            _ref5 = _context4.sent;
            products = _ref5.products;
            return _context4.abrupt('return', res.status(200).send({ status: 'Successful', products: products }));

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4['catch'](0);
            return _context4.abrupt('return', res.status(404).send({ status: 'Unsuccessful', error: _context4.t0 }));

          case 12:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 9]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.default = categoriesController;