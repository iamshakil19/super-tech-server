const Product = require("../models/product.model");

exports.createProductServices = async (productInfo) => {
  const product = await Product.create(productInfo);
  return product;
};
