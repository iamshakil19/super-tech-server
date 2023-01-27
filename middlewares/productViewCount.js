const { getProductByIdService } = require("../services/product.services");

const productViewCount = async (req, res) => {
  const { id } = req.params;
  const product = await getProductByIdService(id);

  if (!product) {
    res.status(404).send({
      success: true,
      message: "Product not found",
    });
  }
  product.views += 1;
  await product.save();

  res.status(200).send({
    success: true,
    data: product,
  });
};

module.exports = productViewCount
