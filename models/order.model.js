const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = mongoose.Schema(
  {
    orderId: {
      type: Number,
      unique: true,
      required: [true, "Please provide a name"],
    },
    cart: {
      type: Array,
      required: [true, "Please add product"],
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Provide a valid email"],
      trim: true,
      lowercase: true,
      required: [true, "Email address is required"],
    },
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [30, "Name is too large"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      validate: [
        validator.isMobilePhone,
        "Please provide a valid phone number",
      ],
    },
    subTotal: {
      type: Number,
      required: [true, "Subtotal price is required"],
    },
    totalQuantity: {
      type: Number,
      required: [true, "Total quantity price is required"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
    },
    status: {
      type: String,
      default: "pending",
    },
    company: {
      type: String,
    },
    postalCode: {
      type: String,
      trim: true,
    },
    division: {
      type: String,
      trim: true,
      required: [true, "Division is required"],
    },
    area: {
      type: String,
      trim: true,
      required: [true, "Area is required"],
    },
    streetAddress: {
      type: String,
      trim: true,
      required: [true, "Street address is required"],
    },
    shippingMethod: {
      type: String,
      required: [true, "shipping method is required"],
    },
    shippingCost: {
      type: Number,
      required: [true, "shipping cost is required"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
    },
    billingAddress: {
      type: Object,
      required: [true, "Billing address is required"],
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.methods.logger = function () {
  console.log(`Data save for ${this.name}`);
};

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
