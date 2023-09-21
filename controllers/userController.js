const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/users");
const Session = require("../models/sessions");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

//@doc Register a user
//@route POST /register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, confirm_password } = req.body;
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  if (!username || !email || !password || !confirm_password) {
    res.status(400);
    throw new Error("All fileds are mandetory");
  }
  if (password != confirm_password) {
    res.status(400);
    throw new Error("Please Enter Correct Password");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("user already registered!");
  }
  //hash the password before saving to db
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (user) {
    const token = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    const session = new Session({ userId: user._id, token });
    await session.save();
    res.status(201).json({ token });
  } else {
    res.status(400);
    throw new Error("User data is not Valid");
  }
});

//@doc Login a user
//@route POST  /login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fileds are mandetory");
  }
  const user = await User.findOne({ email });
  //compare user password and hashed password saved in db
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "24h" }
    );
    const session = new Session({ userId: user._id,token });
    await session.save();
    res.status(200).json({ token });
  } else {
    res.status(400);
    throw new Error("email or password is not valid");
  }
});
//@doc Logout Current user
//@route GET  /api/user/logout
//@access private
const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const token = req.header('Authorization').replace('Bearer', '');
  await Session.deleteOne({userId,token});
  res.status(200).json({mesg:"Logout successful"});
});

//@doc  Protected route (requires authentication)
//@route GET  /protected
//@access private
const protectedRoute = asyncHandler(async(req, res) => {
  res.json({ message: 'This is a protected route' });
});
module.exports = { registerUser, loginUser, logoutUser, protectedRoute };
