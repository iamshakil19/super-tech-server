const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    description: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs"],
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
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VALUE}",
      },
    },
    color: {
      type: String,
    },
    category: {
      type: String,
      required: true,
      enum: {
        values: ["chair", "table", "sofa", "storage"],
        message:
          "category value can't be {VALUE}, must be chair/table/sofa/storage",
      },
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre("save", function (next) {
  if (this.quantity == 0) {
    this.status = "out-of-stock";
  }
  next();
});

productSchema.methods.logger = function () {
  console.log(`Data save for ${this.name}`);
};

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
