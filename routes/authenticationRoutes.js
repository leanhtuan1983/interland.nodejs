const express = require("express");
const router = express.Router();
const authenticationController = require("../controllers/authenticationController");

router.get("/", authenticationController.loginForm);
router.post("/postLogin", authenticationController.postLogin);

module.exports = router;
