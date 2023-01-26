const router = require('express').Router();
const productControllers = require("../controllers/product.controllers")


router.post("/", productControllers.createProduct)



module.exports = router;