# Heady's API backend assessment
## To access the api go [here](https://heady-backend-test.herokuapp.com/).

## To test it locally
- `git clone git@github.com:imankit/heady_api.git`
- `cd heady_api/`
- `yarn` or `npm i`
- `npm start`

## API Endpoints

`GET /categories` returns list of all categories
---
`POST /category` creates a new category with name, parent_category_id 
---
`GET /category/:category_id` returns category for specific category_id 
---
`GET /category/:category_id/products` returns all products for a specific category_id
---

`GET /products` returns list of all products
---

`POST /product` creates a new product with name, price, description, and category to which it belongs to
---
`PUT /product/:product_id` updates the specific product like changing name, or adding new category/categories
---




