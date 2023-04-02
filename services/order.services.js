const Order = require("../models/order.model");

exports.createOrderService = async (data) => {
  const order = await Order.create(data);
  return order;
};

exports.getOrderService = async (filters, queries) => {
  let finalFilter = {};
  if (filters.orderSearchText) {
    finalFilter = {
      ...finalFilter,
      $or: [
        { orderId: { $regex: filters.orderSearchText, $options: "i" } },
        { name: { $regex: filters.orderSearchText, $options: "i" } },
        { phoneNumber: { $regex: filters.orderSearchText, $options: "i" } },
      ],
    };
  }
  if (filters.status) {
    finalFilter = { ...finalFilter, status: filters.status };
  }
  const orders = await Order.find(finalFilter)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const totalOrders = await Order.countDocuments(finalFilter);
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
