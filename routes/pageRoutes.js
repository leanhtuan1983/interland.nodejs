const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");

router.get("/home", pageController.home);

module.exports = router;
