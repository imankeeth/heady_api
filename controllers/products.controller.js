import mongoose from 'mongoose';
import models from '../models';
import logger from '../core/logger';

const { Categories, Products } = models;
const productsController = {};

productsController.addProduct = async (req, res) => {
  const { name, price = 0, description, categories = [] } = req.body;
  console.log(req.body);
  try {
    if (!categories && !categories.length) {
      return res
        .status(409)
        .send({ status: 'Unsuccessful', error: 'Product should have atleast 1 category.' });
    }

    const new_product = new Products({
      _id: new mongoose.Types.ObjectId(),
      name,
      price,
      description,
      categories,
    });
    await new_product.save();
    logger.info('Adding a product');
    try {
      categories.forEach(async (cat) => {
        const category = await Categories.findById(cat);
        await category.products.push(new_product['_id']);
        await category.save();
        logger.info('Product successfuly linked to category');
      });
    } catch (error) {
      logger.error('Unable to link product and category');
      return res.status(409).send({ status: 'Unsuccessful', error });
    }
    return res.status(201).send({ status: 'Successful', products: new_product['_doc'] });
  } catch (error) {
    return res.status(409).send({ status: 'Unsuccessful', error });
  }
};

productsController.updateProductDetails = async (req, res) => {
  const { name, price = 0, description, categories = [] } = req.body;
  const { product_id } = req.params;
  try {
    await Products.findByIdAndUpdate(product_id, {
      $set: { name, price, description },
      $push: { categories: { $each: [...categories] } },
    });
    logger.info('Updated product details');
    categories.forEach(async (cat) => {
      const category = await Categories.findById(cat);
      await category.products.push(product_id);
      await category.save();
      logger.info('Product successfuly linked to category');
    });
    return res.status(200).send({ status: 'Successful' });
  } catch (error) {
    logger.error('Error sending all categories: ', error);
    return res.status(404).send({ status: 'Unsuccessful', error });
  }
};

productsController.getAllProducts = async (req, res) => {
  try {
    const products = await Products.find()
      .populate({ path: 'categories', select: 'name _id' })
      .exec();
    logger.info('Sending all products');
    return res.status(200).send({ status: 'Successful', products });
  } catch (error) {
    return res.status(404).send({ status: 'Unsuccessful', error });
  }
};

export default productsController;
