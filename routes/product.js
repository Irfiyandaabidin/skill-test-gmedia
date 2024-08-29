const route = require("express").Router();
const product = require("../app/controller/product.controller");
const { productValidator } = require("../app/validator/product.validator");
const upload = require("../library/fileUpload");
const authenticate = require("../middleware/authenticate");

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []  # Assuming JWT authentication
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *                 example: test
 *               price:
 *                 type: integer
 *                 description: The price of the product
 *                 example: 123
 *               image_product:
 *                 type: string
 *                 format: binary
 *                 description: The image file for the product
 *               id_category:
 *                 type: integer
 *                 description: The ID of the category to which the product belongs
 *                 example: 1
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message
 *                   example: Add Product Successfully!
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The name of the product
 *                       example: test
 *                     price:
 *                       type: integer
 *                       description: The price of the product
 *                       example: 123
 *                     image_product:
 *                       type: string
 *                       description: The path to the uploaded image file
 *                       example: upload/images/1724918590598.jpeg
 *                     id_category:
 *                       type: integer
 *                       description: The ID of the category to which the product belongs
 *                       example: 1
 *                     id:
 *                       type: integer
 *                       description: The ID of the created product
 *                       example: 2
 */
route.post("/product", authenticate, upload.single("image_product"), productValidator, product.create);

/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: Update an existing product by ID
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []  # Assuming JWT authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *                 example: test
 *               price:
 *                 type: integer
 *                 description: The price of the product
 *                 example: 123
 *               image_product:
 *                 type: string
 *                 format: binary
 *                 description: The image file for the product
 *               id_category:
 *                 type: integer
 *                 description: The ID of the category to which the product belongs
 *                 example: 1
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message
 *                   example: Update Product Successfully!
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the updated product
 *                       example: 2
 *                     name:
 *                       type: string
 *                       description: The name of the product
 *                       example: test
 *                     price:
 *                       type: integer
 *                       description: The price of the product
 *                       example: 123
 *                     image_product:
 *                       type: string
 *                       description: The path to the updated image file
 *                       example: upload/images/1724918820763.jpeg
 *                     id_category:
 *                       type: integer
 *                       description: The ID of the category to which the product belongs
 *                       example: 1
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: The creation timestamp of the product
 *                       example: "2024-08-29T08:03:10.673Z"
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       description: The last update timestamp of the product
 *                       example: "2024-08-29T08:07:00.778Z"
 */
route.put("/product/:id", authenticate, upload.single("image_product"), productValidator, product.update);

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []  # Assuming JWT authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message
 *                   example: Delete Product Successfully!
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   description: The response data (null in this case)
 *                   example: null
 */
route.delete("/product/:id", authenticate, product.destroy);

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Retrieve all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message
 *                   example: Get All Product Successfully!
 *                 data:
 *                   type: object
 *                   properties:
 *                     results:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             description: The name of the product
 *                             example: test
 *                           price:
 *                             type: integer
 *                             description: The price of the product
 *                             example: 123
 *                           image_product:
 *                             type: string
 *                             description: The path to the product image
 *                             example: upload/images/1724918820763.jpeg
 *                           category:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 description: The name of the category to which the product belongs
 *                                 example: test category
 *                     total:
 *                       type: integer
 *                       description: Total number of products
 *                       example: 1
 */
route.get("/product", product.getAll);

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the product to retrieve
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message
 *                   example: Get product successfully!
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The name of the product
 *                       example: test
 *                     price:
 *                       type: integer
 *                       description: The price of the product
 *                       example: 123
 *                     category:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           description: The name of the category to which the product belongs
 *                           example: test category
 */
route.get("/product/:id", product.get);

module.exports = route;