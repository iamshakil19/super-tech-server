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
    primaryImage: {
      type: String,
      // required: [true, "Primary image is required"],
      default: "",
    },
    description: {
      type: String,
      required: true,
    },
    colors: {
      type: Array,
    },
    sizes: {
      type: Array,
    },
    category: {
      type: String,
      required: true,
      enum: {
        values: [
          "home",
          "table",
          "storage",
          "steelFurniture",
          "chair",
          "sofa",
          "workStation",
          "garments",
          "interior",
        ],
        message: "category value can't be {VALUE}",
      },
    },
    subCategory: {
      type: String,
      required: true,
      enum: {
        values: [
          "bed",
          "dressingTable",
          "cupBoard",
          "Wardrobe",
          "tvTrolley",
          "bookShelf",
          "showcaseCornerShelf",
          "dinnerWagon",
          "dinningTableChair",
          "directorTable",
          "executiveTable",
          "managerTable",
          "computerTable",
          "drawer",
          "sideCabinet",
          "fileCabinet",
          "multipurposeShelf",
          "shoeRack",
          "almirah",
          "4drawer",
          "3drawer",
          "drawerCumFileCabinet",
          "slottedAngleRack",
          "heavyDutyRack",
          "highBack",
          "mediumBack",
          "lowBack",
          "fixedVisitor",
          "tool",
          "auditoriumChair",
          "groupChair",
          "sofa",
          "centerTable",
          "divan",
          "fabric",
          "metal",
          "others",
          "qcTable",
          "centerCuttingPackingTable",
          "inputLoadingTable",
          "taggingPolyTable",
          "cutPartInspectionTable",
          "fabricRelaxingMultiLevelRack",
          "inspectionTable",
          "measurementTable",
          "ironTable",
          "workerChair",
          "living",
          "kitchen",
          "office",
          "restaurant",
        ],
        message: "subcategory value can't be {VALUE}",
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
