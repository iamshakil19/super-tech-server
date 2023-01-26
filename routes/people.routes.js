const router = require('express').Router();
const peopleControllers = require("../controllers/people.controllers")

router.post("/signup", peopleControllers.signup)








module.exports = router;