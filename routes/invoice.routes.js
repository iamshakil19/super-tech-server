const authorization = require("../middlewares/authorization");
const verifyToken = require("../middlewares/verifyToken");
const invoiceController = require("../controllers/invoice.controllers");
const router = require("express").Router();

router
  .route("/")
  .post(
    verifyToken,
    authorization("admin", "moderator"),
    invoiceController.createInvoiceNo
  )
  .get(
    verifyToken,
    authorization("admin", "moderator"),
    invoiceController.getInvoiceNo
  )
  .patch(
    verifyToken,
    authorization("admin", "moderator"),
    invoiceController.updateInvoiceNo
  );

module.exports = router;
