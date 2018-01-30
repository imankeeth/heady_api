'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var CategorySchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true },
  parent_category: { type: Schema.Types.ObjectId, ref: 'Category' },
  child_categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

exports.default = _mongoose2.default.model('Category', CategorySchema);