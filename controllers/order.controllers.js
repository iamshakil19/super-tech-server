const { isValidObjectId } = require("mongoose");

const {
  createOrderService,
  getOrderService,
  getOrderByEmailService,
  updateOrderService,
  deleteOrderService,
} = require("../services/order.services");

exports.createOrder = async (req, res) => {
  try {
    const result = await createOrderService(req.body);
    res.status(200).send({
      success: true,
      message: "Order inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "order is not inserted",
      error: error.message,
    });
  }
};

exports.getOrders = async (req, res) => {
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
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * Number(limit);
      queries.skip = skip;
      queries.limit = Number(limit);
    }

    const orders = await getOrderService(filters, queries);
    res.status(200).send({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.getOrderByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const myOrders = await getOrderByEmailService(email);

    res.status(200).send({
      success: true,
      data: myOrders,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).send({ success: false, error: "Not a valid id" });
    }

    const result = await updateOrderService(id, req.body);

    if (!result.modifiedCount) {
      return res.status(400).send({
        success: false,
        error: "couldn't update the product with this id",
      });
    }

    res.status(200).send({
      success: true,
      message: "Successfully update the order",
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

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).send({ success: false, error: "Not a valid id" });
    }
    const result = await deleteOrderService(id);
    if (!result.deletedCount) {
      return res.status(400).send({
        success: false,
        error: "Couldn't delete the product",
      });
    }
    res.status(200).send({
      success: true,
      message: "Order delete successfully",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "couldn't delete the order",
      error: error.message,
    });
  }
};
