const express = require("express");
const Auth = require("./authController");
const checkLogin = require("../middleware/auth");
const validateDetails = require("../data/validations");
const router = express.Router();
router.post("/auth/register", validateDetails, Auth.register);
router.post("/auth/login", validateDetails, Auth.login);
router.get("/restricted/users", Auth.getUsers);

module.exports = router;
