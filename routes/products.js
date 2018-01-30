import { Router as router } from 'express';
import productsController from '../controllers/products.controller';

const productsRoute = router();
const productRoute = router();

// Get all products
productsRoute.get('/', (req, res) => {
  productsController.getAllProducts(req, res);
});

productRoute
  .post('/', (req, res) => {
    // Add Product mapped to a category or categories.
    productsController.addProduct(req, res);
  })
  .put('/:product_id', (req, res) => {
    // Update product details (name,price,etc)
    productsController.updateProductDetails(req, res);
  });

export default { productsRoute, productRoute };
