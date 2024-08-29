const route = require("express").Router();
const category = require("../app/controller/category.controller");
const { categoryValidator } = require("../app/validator/category.validator");
const authenticate = require("../middleware/authenticate");

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category
 *                 example: test category
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message
 *                   example: Add Category Successfully!
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the created category
 *                       example: 2
 *                     name:
 *                       type: string
 *                       description: The name of the created category
 *                       example: test category
 */
route.post("/category", authenticate, categoryValidator, category.create);

/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Update an existing category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the category
 *                 example: test category
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message
 *                   example: Update Category Successfully!
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the updated category
 *                       example: 1
 *                     name:
 *                       type: string
 *                       description: The updated name of the category
 *                       example: test category
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: The creation timestamp of the category
 *                       example: "2024-08-29T04:47:07.535Z"
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       description: The last update timestamp of the category
 *                       example: "2024-08-29T04:47:07.535Z"
 */
route.put("/category/:id", authenticate, categoryValidator, category.update);

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message
 *                   example: Delete Category Successfully!
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   description: The response data (null in this case)
 *                   example: null
 */
route.delete("/category/:id", authenticate, category.destroy);

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Mengambil semua kategori
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Daftar kategori
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Pesan respons
 *                   example: Get All Categories Successfully!
 *                 data:
 *                   type: object
 *                   properties:
 *                     results:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: ID kategori
 *                             example: 1
 *                           name:
 *                             type: string
 *                             description: Nama kategori
 *                             example: test
 *                           products:
 *                             type: array
 *                             items:
 *                               type: object
 *                             description: Daftar produk dalam kategori
 *                             example: []
 *                     total:
 *                       type: integer
 *                       description: Total jumlah kategori
 *                       example: 1
 */
route.get("/category", category.getAll)

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Retrieve a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the category to retrieve
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message
 *                   example: Get Category successfully!
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the category
 *                       example: 1
 *                     name:
 *                       type: string
 *                       description: The name of the category
 *                       example: test category
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                       description: List of products in the category
 *                       example: []
 */
route.get("/category/:id", category.get)

module.exports = route