const route = require("express").Router();
const auth = require("../app/controller/auth.controller");
const { loginValidator } = require("../app/validator/auth.validator");

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate a user and return a token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *                 example: irfiyanda
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: secret
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message
 *                   example: Login successfully!
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the user
 *                       example: 1
 *                     email:
 *                       type: string
 *                       description: The email of the user
 *                       example: irfi@mail.com
 *                     username:
 *                       type: string
 *                       description: The username of the user
 *                       example: irfiyanda
 *                     phone_number:
 *                       type: string
 *                       nullable: true
 *                       description: The phone number of the user
 *                       example: null
 *                     token:
 *                       type: string
 *                       description: The JWT token for the authenticated session
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJpcmZpQG1haWwuY29tIiwidXNlcm5hbWUiOiJpcmZpeWFuZGEiLCJwaG9uZV9udW1iZXIiOm51bGwsImlhdCI6MTcyNDkyMDU4MiwiZXhwIjoxNzI0OTQyMTgyfQ.ZZRoFZ1KW2-xsf38uxMALUh75t2gn1EDrXkYKCU7yFw
 */
route.post("/login", loginValidator, auth.login);

module.exports = route;