const router = require("express").Router();
const orderController = require("../controllers/order.controllers");
const authorization = require("../middlewares/authorization");
const verifyToken = require("../middlewares/verifyToken");
router
  .route("/")
  .get(
    verifyToken,
    authorization("admin", "moderator"),
    orderController.getOrders
  )
  .post(verifyToken, authorization("user"), orderController.createOrder);

router
  .route("/:id")
  .patch(
    verifyToken,
    authorization("admin", "moderator"),
    orderController.updateOrder
  )
  .delete(verifyToken, authorization("admin"), orderController.deleteOrder);

router.get("/:email", verifyToken, orderController.getOrderByEmail);

module.exports = router;
