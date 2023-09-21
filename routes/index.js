const express = require("express");
const router = express.Router();
const upload = require('../middleware/multer');
const validateToken = require('../middleware/validateUserToken');
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");
router.post("/register",registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);
module.exports = router;