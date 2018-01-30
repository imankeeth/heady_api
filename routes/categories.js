import { Router as router } from 'express';
import categoriesController from '../controllers/categories.controller';

const categoriesRoute = router();
const categoryRoute = router();

// Get all categories with all its child categories mapped to it.
categoriesRoute.get('/', (req, res) => {
  categoriesController.getAllCategories(req, res);
});

categoryRoute
  .post('/', (req, res) => {
    // Add a new category
    categoriesController.addCategory(req, res);
  })
  .get('/:category_id', (req, res) => {
    // Get a category by ID
    categoriesController.getSingleCategoryById(req, res);
  })
  .get('/:category_id/products', (req, res) => {
    // Get all products by a category.
    categoriesController.findProductsByCategory(req, res);
  });

export default { categoriesRoute, categoryRoute };
