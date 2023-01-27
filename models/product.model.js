const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Please provide a name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    previousPrice: Number,

    description: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["pcs"],
        message: "unit value can't be {VALUE}, must be kg/litre/pcs",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "Quantity must be an integer",
    },
    status: {
      type: String,
      default: "in-stock",
    },
    color: {
      type: Array,
    },
    size: {
      type: Array,
    },
    style: Array,
    category: {
      type: String,
      required: true,
      enum: {
        values: [
          "table",
          "chair",
          "home-furniture",
          "steel-furniture",
          "garments-furniture",
          "office-furniture",
        ],
        message: "category value can't be {VALUE}",
      },
    },
    subCategory: {
      type: String,
      required: true,
      enum: {
        values: [
          "cupboard",
          "work-station",
          "office-almirah",
          "filling-cabinet",
          "computer-table",
          "shoe-rack",
          "office-drawer",
          "side-cabinet",
          "book-shelf",
          "dinner-wagon",
          "wardrobe",
          "managerial-chair",
          "executive-table",
          "fixed-chair",
          "group-chair",
          "managerial-table",
          "special-product",
          "interior-works",
          "class-room-chair-&-table",
          "office-sofa",
          "high-back-chair",
          "reading-table",
          "showcase-&-corner-shelf",
          "tv-trolley",
          "dining-table-&-chair",
          "bed",
          "dressing-table",
          "multipurpose-shelf",
          "reception-table",
          "medium-back-chair",
          "low-back-chair",
          "garments-furniture",
          "kitchen-cabinet",
        ],
        message: "category value can't be {VALUE}",
      },
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.methods.logger = function () {
  console.log(`Data save for ${this.name}`);
};

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
