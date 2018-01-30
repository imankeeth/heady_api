import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    parent_category: { type: Schema.Types.ObjectId, ref: 'Category' },
    child_categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export default mongoose.model('Category', CategorySchema);
