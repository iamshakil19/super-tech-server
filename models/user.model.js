const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a first name"],
    trim: true,
    minLength: [3, "Name must be at least 3 characters."],
    maxLength: [30, "Name is too large"],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Provide a valid email"],
    trim: true,
    lowercase: true,
    unique: [true, "Email is already in use"],
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
          maxLength: 15,
          minLowercase: 1,
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
  profession: {
    type: String,
    trim: true,
    default: "",
  },
  birthday: {
    type: String,
    trim: true,
    default: "",
  },
  gender: {
    type: String,
    trim: true,
    default: "",
  },
  division: {
    type: String,
    trim: true,
    default: "",
  },
  postalCode: {
    type: String,
    trim: true,
    default: "",
  },
  area: {
    type: String,
    trim: true,
    default: "",
  },
  streetAddress: {
    type: String,
    trim: true,
    default: "",
  },
  avatar: {
    type: String,
    trim: true,
    default: "",
  },
  role: {
    type: String,
    enum: ["admin", "moderator", "user"],
    default: "user",
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", function (next) {
  const password = this.password;
  const hashedPassword = bcrypt.hashSync(password);

  this.password = hashedPassword;
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePassword = function (password, hash) {
  const isPasswordValid = bcrypt.compareSync(password, hash);
  return isPasswordValid;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
