const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const isLoggedIn = require("../middlewares/authentication"); 

router.get("/", isLoggedIn, dashboardController.index);

module.exports = router;
