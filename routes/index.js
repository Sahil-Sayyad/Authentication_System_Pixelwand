const express = require("express");
const router = express.Router();
const { check} = require('express-validator');
const validateToken = require('../middleware/validateUserToken');
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");
router.post("/register",
[
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
    check('username').isLength({ min: 2 }),
]
,registerUser);
router.post("/login", loginUser);
router.get("/logout", validateToken, currentUser);
module.exports = router;