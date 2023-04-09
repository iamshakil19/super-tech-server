const { isValidObjectId } = require("mongoose");
const {
  createInvoiceNoService,
  getInvoiceNoService,
  updateInvoiceNoService,
} = require("../services/invoice.services");

exports.createInvoiceNo = async (req, res) => {
  try {
    const result = await createInvoiceNoService(req.body);
    res.status(200).send({
      success: true,
      message: "Invoice no inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "invoice no is not inserted",
      error: error.message,
    });
  }
};

exports.getInvoiceNo = async (req, res) => {
  try {
    const id = "64324ee5e6e7b41c5721d524";

    if (!isValidObjectId(id)) {
      return res.status(400).send({ success: false, error: "Not a valid id" });
    }

    const invoice = await getInvoiceNoService(id);

    if (!invoice) {
      return res.status(400).send({
        success: false,
        error: "couldn't find a invoice id with this id",
      });
    }

    res.status(200).send({
      success: true,
      data: invoice,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.updateInvoiceNo = async (req, res) => {

  try {
    const id = "64324ee5e6e7b41c5721d524";
    if (!isValidObjectId(id)) {
      return res.status(400).send({ success: false, error: "Not a valid id" });
    }

    const result = await updateInvoiceNoService(id);
    if (!result.modifiedCount) {
      return res.status(400).send({
        success: false,
        error: "couldn't update the invoice no with this id",
      });
    }

    res.status(200).send({
      success: true,
      message: "Successfully update the invoice no",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "could't update the invoice",
      error: error.message,
    });
  }
};
