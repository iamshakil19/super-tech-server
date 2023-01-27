const Product = require("../models/product.model");

exports.createProductService = async (productInfo) => {
  const product = await Product.create(productInfo);
  return product;
};

exports.getProductService = async (filters, queries) => {
  const product = await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const totalProduct = await Product.countDocuments(filters);
  const pageCount = Math.ceil(totalProduct / queries.limit);
  return { product, totalProduct, pageCount };
};

exports.getProductByIdService = async (id) => {
  const result = await Product.findOne({ _id: id });
  return result;
};

exports.updateProductService = async (productId, data) => {
  console.log(productId, data);
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

exports.deleteProductService = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};
