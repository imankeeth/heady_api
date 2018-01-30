'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var ProductSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  description: { type: String },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

exports.default = _mongoose2.default.model('Product', ProductSchema);