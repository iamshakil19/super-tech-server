const { isValidObjectId } = require("mongoose");

const {
  createProductService,
  getProductService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
  productBulkUpdateService,
} = require("../services/product.services");

exports.createProduct = async (req, res) => {
  const extraImages = [];
  const extraImagesData = req.files.extraImages;

  if (extraImagesData?.length > 0) {
    for (let i = 0; i < extraImagesData.length; i++) {
      const extraImage = extraImagesData[i].filename;
      extraImages.push(extraImage);
    }
  }
  const primaryImage = req.files?.primaryImage[0]?.filename;
  try {
    const productData = JSON.parse(req.body?.others);
    const finalProductData = {
      ...productData,
      primaryImage,
      extraImages,
    };
    const result = await createProductService(finalProductData);
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

exports.getProducts = async (req, res) => {
  try {
    let filters = { ...req.query };
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filterString);

    const queries = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }

    if (req.query.page) {
      const { page = 1, limit = 2 } = req.query;
      const skip = (page - 1) * Number(limit);
      queries.skip = skip;
      queries.limit = Number(limit);
    }

    const products = await getProductService(filters, queries);
    res.status(200).send({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).send({ success: false, error: "Not a valid id" });
    }

    const product = await getProductByIdService(id);

    if (!product) {
      return res.status(400).send({
        success: false,
        error: "couldn't find a product with this id",
      });
    }

    res.status(200).send({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).send({ success: false, error: "Not a valid id" });
    }
    const result = await updateProductService(id, req.body);
    if (!result.modifiedCount) {
      return res.status(400).send({
        success: false,
        error: "couldn't update the product with this id",
      });
    }

    res.status(200).send({
      success: true,
      message: "Successfully update the product",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "could't update the product",
      error: error.message,
    });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).send({ success: false, error: "Not a valid id" });
    }
    const result = await updateProductService(id, req.body);
    if (!result.modifiedCount) {
      return res.status(400).send({
        success: false,
        error: "couldn't update the product with this id",
      });
    }

    res.status(200).send({
      success: true,
      message: "Successfully update the product",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "could't update the product",
      error: error.message,
    });
  }
};

exports.productBulkUpdate = async (req, res) => {
  console.log(req.body);
  try {
    const result = await productBulkUpdateService(req.body);
    if (!result.modifiedCount) {
      return res.status(400).send({
        success: false,
        error: "couldn't update the product with this id",
      });
    }

    res.status(200).send({
      success: true,
      message: "Successfully update the product",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "could't update the product",
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).send({ success: false, error: "Not a valid id" });
    }
    const result = await deleteProductService(id);
    if (!result.deletedCount) {
      return res.status(400).send({
        success: false,
        error: "Couldn't delete the product",
      });
    }

    res.status(200).send({
      success: true,
      message: "Product delete successfully",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "couldn't delete the product",
      error: error.message,
    });
  }
};
