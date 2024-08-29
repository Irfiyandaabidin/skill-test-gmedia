const route = require("express").Router();
const transaction = require("../app/controller/transaction.controller");
const authenticate = require("../middleware/authenticate");

/**
 * @swagger
 * /transaction:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []  # Assuming JWT authentication
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message
 *                   example: Create Transaction Successfully!
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the transaction
 *                         example: 36
 *                       id_user:
 *                         type: integer
 *                         description: The ID of the user who made the transaction
 *                         example: 1
 *                       id_product:
 *                         type: integer
 *                         description: The ID of the product in the transaction
 *                         example: 3
 *                       qty:
 *                         type: integer
 *                         description: The quantity of the product in the transaction
 *                         example: 10
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: The creation timestamp of the transaction
 *                         example: "2024-08-29T08:23:33.483Z"
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         description: The last update timestamp of the transaction
 *                         example: "2024-08-29T08:23:33.483Z"
*/
route.post("/transaction", authenticate, transaction.create);

/**
 * @swagger
 * /transaction/{id}:
 *   get:
 *     summary: Retrieve all transactions for a specific user
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []  # Assuming JWT authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user whose transactions are to be retrieved
 *     responses:
 *       200:
 *         description: Successfully retrieved all transactions for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message
 *                   example: Get All Transaction User Successfully!
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the transaction
 *                         example: 36
 *                       id_user:
 *                         type: integer
 *                         description: The ID of the user who made the transaction
 *                         example: 1
 *                       id_product:
 *                         type: integer
 *                         description: The ID of the product in the transaction
 *                         example: 3
 *                       qty:
 *                         type: integer
 *                         description: The quantity of the product in the transaction
 *                         example: 10
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: The creation timestamp of the transaction
 *                         example: "2024-08-29T08:23:33.483Z"
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         description: The last update timestamp of the transaction
 *                         example: "2024-08-29T08:23:33.483Z"
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
 */
route.get("/transaction/:id", authenticate, transaction.get);

/**
 * @swagger
 * /transaction:
 *   get:
 *     summary: Retrieve all transactions for the authenticated user
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []  # Assuming JWT authentication
 *     responses:
 *       200:
 *         description: Successfully retrieved all transactions for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message
 *                   example: Get All Transaction Successfully!
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the transaction
 *                         example: 36
 *                       id_user:
 *                         type: integer
 *                         description: The ID of the user who made the transaction
 *                         example: 1
 *                       id_product:
 *                         type: integer
 *                         description: The ID of the product in the transaction
 *                         example: 3
 *                       qty:
 *                         type: integer
 *                         description: The quantity of the product in the transaction
 *                         example: 10
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: The creation timestamp of the transaction
 *                         example: "2024-08-29T08:23:33.483Z"
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         description: The last update timestamp of the transaction
 *                         example: "2024-08-29T08:23:33.483Z"
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
 */
route.get("/transaction", authenticate, transaction.getAll);

module.exports = route;