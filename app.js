const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
require("./db")
app.use(express.urlencoded({ extended : true}))
app.use(express.json())

app.use(require("./routes/apiRoutes"))
app.use(require("./routes/userRoutes"))

module.exports = app;