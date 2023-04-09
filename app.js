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
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes")
const orderRouter = require("./routes/order.routes")
const invoiceRouter = require("./routes/invoice.routes")

// database connection function
databaseConnection();

// Routing Setup
app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Welcome to the SUPER TECH server",
  });
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/invoice", invoiceRouter);
app.use("/api/v1/uploads", express.static("./images"))

module.exports = app;
