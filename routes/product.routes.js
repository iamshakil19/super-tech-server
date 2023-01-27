const router = require("express").Router();
const productControllers = require("../controllers/product.controllers");
const authorization = require("../middlewares/authorization");
const productViewCount = require("../middlewares/productViewCount");
const verifyToken = require("../middlewares/verifyToken");



router
  .route("/")
  .get(productControllers.getProducts)
  .post(verifyToken, authorization("admin", "moderator"), productControllers.createProduct);

router
  .route("/:id")
  .get(productViewCount, productControllers.getProductById)
  .patch(productControllers.updateProduct)
  .delete(verifyToken, productControllers.deleteProduct);

module.exports = router;
