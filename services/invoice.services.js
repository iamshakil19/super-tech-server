const Invoice = require("../models/invoice.model");

exports.createInvoiceNoService = async (data) => {
  const invoiceNo = await Invoice.create(data);
  return invoiceNo;
};

exports.getInvoiceNoService = async (id) => {
  const result = await Invoice.findOne({ _id: id });
  return result;
};

exports.updateInvoiceNoService = async (id) => {
  const result = await Invoice.updateOne(
    { _id: id },
    { $inc: { invoiceNo: 1 } },
    { new: true }
  );
  console.log(result);
  return result;
};
