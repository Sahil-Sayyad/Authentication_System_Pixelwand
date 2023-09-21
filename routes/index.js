const express = require("express");
const router = express.Router();
const {check} = require('express-validator');
//a middleware to authenticate API requests.
const authMiddleware = require('../middleware/validateUserToken');
const {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  protectedRoute
} = require("../controllers/userController");

/**Validate user input, ensuring that:
    - Email is in a valid format.
    - Password meets security requirements (e.g., minimum length, complexity). */
router.post("/register",
[
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
    check('username').isLength({ min: 2 }),
]
,registerUser);

router.post("/login", loginUser);
router.get("/logout", authMiddleware, logoutUser);
router.get("/refresh", authMiddleware, refreshToken);
router.get("/protected", authMiddleware, protectedRoute);
module.exports = router;