const route = require("express").Router();
const cart = require("../app/controller/cart.controller");
const { cartValidator } = require("../app/validator/cart.validator");
const authenticate = require("../middleware/authenticate");

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []  # Assuming JWT authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_product:
 *                 type: integer
 *                 description: The ID of the product to add to the cart
 *                 example: 3
 *               qty:
 *                 type: integer
 *                 description: The quantity of the product to add
 *                 example: 10
 *     responses:
 *       201:
 *         description: Product added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message
 *                   example: Add Product to Cart Successfully!
 *                 data:
 *                   type: object
 *                   properties:
 *                     id_user:
 *                       type: integer
 *                       description: The ID of the user
 *                       example: 1
 *                     id_product:
 *                       type: integer
 *                       description: The ID of the product added to the cart
 *                       example: 3
 *                     qty:
 *                       type: integer
 *                       description: The quantity of the product added
 *                       example: 10
 *                     id:
 *                       type: integer
 *                       description: The ID of the cart item
 *                       example: 35
 */
route.post("/cart", authenticate, cartValidator, cart.create);

/**
 * @swagger
 * /cart/{id}:
 *   put:
 *     summary: Update the quantity of a product in the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []  # Assuming JWT authentication 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the cart item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_product:
 *                 type: integer
 *                 description: The ID of the product in the cart
 *                 example: 3
 *               qty:
 *                 type: integer
 *                 description: The new quantity of the product
 *                 example: 10
 *     responses:
 *       200:
 *         description: Quantity updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message
 *                   example: Update qty Product from Cart Successfully!
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the cart item
 *                       example: 35
 *                     id_user:
 *                       type: integer
 *                       description: The ID of the user
 *                       example: 1
 *                     id_product:
 *                       type: integer
 *                       description: The ID of the product
 *                       example: 3
 *                     qty:
 *                       type: integer
 *                       description: The updated quantity of the product
 *                       example: 10
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: The creation timestamp of the cart item
 *                       example: "2024-08-29T08:19:49.995Z"
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       description: The last update timestamp of the cart item
 *                       example: "2024-08-29T08:22:12.355Z"
 *                     product:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           description: The name of the product
 *                           example: test
 *                         price:
 *                           type: integer
 *                           description: The price of the product
 *                           example: 123
 */
route.put("/cart/:id", authenticate, cartValidator, cart.update);

/**
 * @swagger
 * /cart/{id}:
 *   delete:
 *     summary: Remove a specific cart item by ID
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []  # Assuming JWT authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the cart item to remove
 *     responses:
 *       200:
 *         description: Successfully removed the cart item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message
 *                   example: Remove Product from Cart Successfully!
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   description: The response data (null in this case)
 *                   example: null
 */
route.delete("/cart/:id", authenticate, cart.destroy);

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Retrieve all cart items for the user
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []  # Assuming JWT authentication
 *     responses:
 *       200:
 *         description: Successfully retrieved all cart items for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message
 *                   example: Get All Cart from User Successfully!
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the cart item
 *                         example: 35
 *                       id_user:
 *                         type: integer
 *                         description: The ID of the user
 *                         example: 1
 *                       id_product:
 *                         type: integer
 *                         description: The ID of the product in the cart
 *                         example: 3
 *                       qty:
 *                         type: integer
 *                         description: The quantity of the product in the cart
 *                         example: 10
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: The creation timestamp of the cart item
 *                         example: "2024-08-29T08:19:49.995Z"
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         description: The last update timestamp of the cart item
 *                         example: "2024-08-29T08:23:26.669Z"
 *                       product:
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
 *                             example: upload/images/1724919556804.jpeg
 *                           category:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 description: The name of the category
 *                                 example: test category
 */
route.get("/cart", authenticate, cart.getAll);

/**
 * @swagger
 * /cart/{id}:
 *   get:
 *     summary: Retrieve a specific cart item by ID
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []  # Assuming JWT authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the cart item to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the cart item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message
 *                   example: Get Cart from User Successfully!
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the cart item
 *                       example: 35
 *                     id_user:
 *                       type: integer
 *                       description: The ID of the user
 *                       example: 1
 *                     id_product:
 *                       type: integer
 *                       description: The ID of the product in the cart
 *                       example: 3
 *                     qty:
 *                       type: integer
 *                       description: The quantity of the product in the cart
 *                       example: 10
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: The creation timestamp of the cart item
 *                       example: "2024-08-29T08:19:49.995Z"
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       description: The last update timestamp of the cart item
 *                       example: "2024-08-29T08:23:26.669Z"
 *                     product:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           description: The name of the product
 *                           example: test
 *                         price:
 *                           type: integer
 *                           description: The price of the product
 *                           example: 123
 *                         image_product:
 *                           type: string
 *                           description: The path to the product image
 *                           example: upload/images/1724919556804.jpeg
 *                         category:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                               description: The name of the category
 *                               example: test category
 */
route.get("/cart/:id", authenticate, cart.get);

module.exports = route;