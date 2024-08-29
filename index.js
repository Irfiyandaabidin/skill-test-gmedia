require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 8000

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/upload/images', express.static(path.join(__dirname, 'upload/images')));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.set("view engine", "hbs");
app.set("views", "./views");
app.get("/", (req, res) => {
  res.render("Welcome", {
    text: "Hello, It's Work!"
  })
})
routes(app, "/");

app.listen(port, () => {
  console.log(`Server running in ${port}`)
});