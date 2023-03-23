const router = require("express").Router();
const userController = require("../controllers/user.controllers");
const authorization = require("../middlewares/authorization");
const uploader = require("../middlewares/uploader");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", userController.allUser);
router.get("/me", verifyToken, userController.getMe);
router
  .route("/:id")
  // .get(userController.getUserByEmail)
  .patch(verifyToken, userController.updateUserInfo);

router.post("/signup", userController.signup);
router.post("/login", userController.login);

router.patch(
  "/avatar/:id",
  uploader.single("avatar"),
  userController.updateUserAvatar
);
module.exports = router;
