const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const peopleSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide a first name"],
    trim: true,
    minLength: [3, "Name must be at least 3 characters."],
    maxLength: [20, "Name is too large"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide a last name"],
    trim: true,
    minLength: [3, "Name must be at least 3 characters."],
    maxLength: [20, "Name is too large"],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Provide a valid email"],
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "Email address is required"],
  },
  contactNumber: {
    type: String,
    required: [true, "Contact number is required"],
    validate: [
      validator.isMobilePhone,
      "Please provide a valid contact number",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: (value) =>
        validator.isStrongPassword(value, {
          minLength: 6,
          minLowercase: 3,
          minNumbers: 1,
          minUppercase: 1,
          minSymbols: 1,
        }),
      message: "Password {VALUE} is not strong enough.",
    },
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Password don't match",
    },
  },
});

const People = mongoose.model("people", peopleSchema);

module.exports = People;
