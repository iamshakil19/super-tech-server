const { createProductServices } = require("../services/product.services");

exports.createProduct = async (req, res) => {
  try {
    const result = await createProductServices(req.body);
    res.status(200).send({
      success: true,
      message: "Data inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "data is not inserted",
      error: error.message,
    });
  }
};
