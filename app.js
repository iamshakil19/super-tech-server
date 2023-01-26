// external imports
const express = require("express");
const app = express();
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { default: mongoose } = require("mongoose");
const databaseConnection = require("./utils/dbConnection");

// Request Parser
app.use(express.json());
app.use(cors());

// import routers
const peopleRouter = require("./routes/people.routes");
const productRouter = require("./routes/product.routes")

// database connection function
databaseConnection();

// Routing Setup
app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Welcome to the SUPER TECH server",
  });
});

app.use("/api/v1/people", peopleRouter);
app.use("/api/v1/product", productRouter);

module.exports = app;
