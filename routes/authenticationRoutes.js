const express = require("express");
const router = express.Router();
const authenticationController = require("../controllers/authenticationController");

router.get("/login", authenticationController.loginForm);
router.post("/postLogin", authenticationController.postLogin);
router.get("/logout", authenticationController.logout);

module.exports = router;
