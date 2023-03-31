const Order = require("../models/order.model");

exports.createOrderService = async (data) => {
  const order = await Order.create(data);
  return order;
};

exports.getOrderService = async (filters, queries) => {
  const orders = await Order.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const totalOrders = await Order.countDocuments(filters);
  const pageCount = Math.ceil(totalOrders / queries.limit);
  return { orders, totalOrders, pageCount };
};

exports.getOrderByEmailService = async (email) => {
  const result = await Order.find({ email: email });
  return result;
};

exports.updateOrderService = async (id, data) => {
  const result = await Order.updateOne(
    { _id: id },
    { $set: data },
    { runValidators: true }
  );
  return result;
};

exports.deleteOrderService = async (id) => {
  const result = await Order.deleteOne({ _id: id });
  return result;
};
