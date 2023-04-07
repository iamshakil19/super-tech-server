const Product = require("../models/product.model");
const fs = require("fs");
const path = require("path");

exports.createProductService = async (finalProductData) => {
  const product = await Product.create(finalProductData);
  return product;
};

exports.getProductService = async (filters, queries) => {
  let finalFilter = {};
  if (filters.productSearchText) {
    finalFilter = {
      ...finalFilter,
      $or: [
        { name: { $regex: filters.productSearchText, $options: "i" } },
        { category: { $regex: filters.productSearchText, $options: "i" } },
        { subCategory: { $regex: filters.productSearchText, $options: "i" } },
      ],
    };
  }
  if (filters.category) {
    finalFilter = { ...finalFilter, category: filters.category };
  }
  if (filters.subCategory) {
    finalFilter = { ...finalFilter, subCategory: filters.subCategory };
  }
  if (filters.price) {
    finalFilter = { ...finalFilter, price: filters.price };
  }
  const products = await Product.find(finalFilter)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const totalProduct = await Product.countDocuments(finalFilter);
  const pageCount = Math.ceil(totalProduct / queries.limit);
  return { products, totalProduct, pageCount };
};

exports.getProductByIdService = async (id) => {
  const result = await Product.findOne({ _id: id });
  return result;
};

exports.updateProductService = async (productId, data) => {
  const result = await Product.updateOne(
    {
      _id: productId,
    },
    {
      $set: data,
    },
    {
      runValidators: true,
    }
  );
  return result;
};

exports.productBulkUpdateService = async (data) => {
  const result = await Product.updateMany({ _id: data.ids }, data.data, {
    runValidators: true,
  });
  return result;
};

exports.deleteProductService = async (id) => {
  const doc = await Product.findById({ _id: id });
  const filePath = path.join(__dirname, "../images", doc.primaryImage);
  fs.unlinkSync(filePath);
  if (doc.extraImages?.length > 0) {
    for (const extraImages of doc.extraImages) {
      const filePath = path.join(__dirname, "../images", extraImages);
      fs.unlinkSync(filePath);
    }
  }
  const result = await Product.deleteOne({ _id: id });
  return result;
};
