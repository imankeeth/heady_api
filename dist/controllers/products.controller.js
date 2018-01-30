'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var Categories = _models2.default.Categories,
    Products = _models2.default.Products;

var productsController = {};

productsController.addProduct = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var _req$body, name, _req$body$price, price, description, _req$body$categories, categories, new_product;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, _req$body$price = _req$body.price, price = _req$body$price === undefined ? 0 : _req$body$price, description = _req$body.description, _req$body$categories = _req$body.categories, categories = _req$body$categories === undefined ? [] : _req$body$categories;

            console.log(req.body);
            _context2.prev = 2;

            if (!(!categories && !categories.length)) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt('return', res.status(409).send({ status: 'Unsuccessful', error: 'Product should have atleast 1 category.' }));

          case 5:
            new_product = new Products({
              _id: new _mongoose2.default.Types.ObjectId(),
              name: name,
              price: price,
              description: description,
              categories: categories
            });
            _context2.next = 8;
            return new_product.save();

          case 8:
            _logger2.default.info('Adding a product');
            _context2.prev = 9;

            categories.forEach(function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(cat) {
                var category;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return Categories.findById(cat);

                      case 2:
                        category = _context.sent;
                        _context.next = 5;
                        return category.products.push(new_product['_id']);

                      case 5:
                        _context.next = 7;
                        return category.save();

                      case 7:
                        _logger2.default.info('Product successfuly linked to category');

                      case 8:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }());
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2['catch'](9);

            _logger2.default.error('Unable to link product and category');
            return _context2.abrupt('return', res.status(409).send({ status: 'Unsuccessful', error: _context2.t0 }));

          case 17:
            return _context2.abrupt('return', res.status(201).send({ status: 'Successful', products: new_product['_doc'] }));

          case 20:
            _context2.prev = 20;
            _context2.t1 = _context2['catch'](2);
            return _context2.abrupt('return', res.status(409).send({ status: 'Unsuccessful', error: _context2.t1 }));

          case 23:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[2, 20], [9, 13]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

productsController.updateProductDetails = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
    var _req$body2, name, _req$body2$price, price, description, _req$body2$categories, categories, product_id;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, _req$body2$price = _req$body2.price, price = _req$body2$price === undefined ? 0 : _req$body2$price, description = _req$body2.description, _req$body2$categories = _req$body2.categories, categories = _req$body2$categories === undefined ? [] : _req$body2$categories;
            product_id = req.params.product_id;
            _context4.prev = 2;
            _context4.next = 5;
            return Products.findByIdAndUpdate(product_id, {
              $set: { name: name, price: price, description: description },
              $push: { categories: { $each: [].concat((0, _toConsumableArray3.default)(categories)) } }
            });

          case 5:
            _logger2.default.info('Updated product details');
            categories.forEach(function () {
              var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(cat) {
                var category;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return Categories.findById(cat);

                      case 2:
                        category = _context3.sent;
                        _context3.next = 5;
                        return category.products.push(product_id);

                      case 5:
                        _context3.next = 7;
                        return category.save();

                      case 7:
                        _logger2.default.info('Product successfuly linked to category');

                      case 8:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, undefined);
              }));

              return function (_x6) {
                return _ref4.apply(this, arguments);
              };
            }());
            return _context4.abrupt('return', res.status(200).send({ status: 'Successful' }));

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4['catch'](2);

            _logger2.default.error('Error sending all categories: ', _context4.t0);
            return _context4.abrupt('return', res.status(404).send({ status: 'Unsuccessful', error: _context4.t0 }));

          case 14:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[2, 10]]);
  }));

  return function (_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

productsController.getAllProducts = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
    var products;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return Products.find().populate({ path: 'categories', select: 'name _id' }).exec();

          case 3:
            products = _context5.sent;

            _logger2.default.info('Sending all products');
            return _context5.abrupt('return', res.status(200).send({ status: 'Successful', products: products }));

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5['catch'](0);
            return _context5.abrupt('return', res.status(404).send({ status: 'Unsuccessful', error: _context5.t0 }));

          case 11:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 8]]);
  }));

  return function (_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();

exports.default = productsController;