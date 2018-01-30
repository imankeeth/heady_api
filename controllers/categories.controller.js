import mongoose from 'mongoose';
import models from '../models';
import logger from '../core/logger';

const { Categories } = models;
const categoriesController = {};

categoriesController.addCategory = async (req, res) => {
  const { name, parent_category = null } = req.body;

  try {
    const new_category = new Categories({
      _id: new mongoose.Types.ObjectId(),
      name,
      parent_category,
    });
    await new_category.save();
    try {
      if (parent_category) {
        const parent = await Categories.findById(parent_category);
        await parent.child_categories.push(new_category['_id']);
        await parent.save();
        logger.info('Child category linked to parent');
      }
    } catch (error) {
      logger.error('Unable to link child category with parent');
      return res.status(409).send({ status: 'Unsuccessful', error });
    }
    logger.info('Adding a category');
    return res.status(201).send({ status: 'Successful', categories: new_category['_doc'] });
  } catch (error) {
    return res.status(409).send({ status: 'Unsuccessful', error });
  }
};

categoriesController.getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.find()
      .populate({ path: 'parent_category', select: 'name _id' })
      .populate({ path: 'child_categories', select: 'name _id' })
      .populate({ path: 'products', select: 'name _id' })
      .exec();
    logger.info('Sending all categories');
    return res.status(200).send({ status: 'Successful', categories });
  } catch (error) {
    logger.error('Error sending all categories: ', error);
    return res.status(404).send({ status: 'Unsuccessful', error });
  }
};

categoriesController.getSingleCategoryById = async (req, res) => {
  try {
    const { category_id } = req.params;

    const category = await Categories.findById(category_id)
      .populate({ path: 'parent_category', select: 'name _id' })
      .populate({ path: 'child_categories', select: 'name _id' })
      .populate({ path: 'products', select: 'name _id' })
      .exec();

    return res.status(200).send({ status: 'Successful', category });
  } catch (error) {
    return res.status(404).send({ status: 'Unsuccessful', error });
  }
};

categoriesController.findProductsByCategory = async (req, res) => {
  try {
    const { category_id } = req.params;

    const { products } = await Categories.findOne({ _id: category_id })
      .populate({ path: 'products' })
      .select('products -_id')
      .exec();

    return res.status(200).send({ status: 'Successful', products });
  } catch (error) {
    return res.status(404).send({ status: 'Unsuccessful', error });
  }
};

export default categoriesController;
