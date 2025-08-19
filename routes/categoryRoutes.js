const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const isLoggedIn = require("../middlewares/authentication");

router.get("/", isLoggedIn, categoryController.index);

module.exports = router;
