const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const databaseConnection = async () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.DATABASE_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connection successful!".cyan.bold);
  } catch (error) {
    console.error(`Error: ${error.message}`.red);
    process.exit(1);
  }
};

module.exports = databaseConnection;
