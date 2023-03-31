const router = require("express").Router();
const productControllers = require("../controllers/product.controllers");
const authorization = require("../middlewares/authorization");
const productViewCount = require("../middlewares/productViewCount");
const uploader = require("../middlewares/uploader");
const verifyToken = require("../middlewares/verifyToken");

router
  .route("/")
  .get(productControllers.getProducts)
  .post(
    verifyToken,
    authorization("admin", "moderator"),
    uploader.fields([
      { name: "primaryImage", maxCount: 1 },
      { name: "extraImages", maxCount: 10 },
    ]),
    productControllers.createProduct
  );

router
  .route("/:id")
  .get(productViewCount, productControllers.getProductById)
  .patch(productControllers.updateProduct)
  .delete(
    verifyToken,
    authorization("admin", "moderator"),
    productControllers.deleteProduct
  );

module.exports = router;
