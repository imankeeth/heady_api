import { Router as router } from 'express';
import categories from './categories';
import products from './products';

const routes = router();

routes.use('/categories', categories.categoriesRoute);
routes.use('/category', categories.categoryRoute);

routes.use('/products', products.productsRoute);
routes.use('/product', products.productRoute);

routes.get('/', (req, res) => {
  res.json({ message: "Welcome to Heady's backend API" });
});

export default routes;
