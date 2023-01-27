const router = require('express').Router();
const userController = require("../controllers/user.controllers");
const verifyToken = require('../middlewares/verifyToken');

router.post("/signup", userController.signup)
router.post("/login", userController.login)
router.get("/me",verifyToken, userController.getMe)



module.exports = router;