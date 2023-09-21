const bcrypt = require("bcrypt");
const User = require("../models/users");
const Session = require("../models/sessions");
const jwt = require("jsonwebtoken");

// **7. Error Handling**
/**here i imported express-async-handler this function automatically add try-catch
 * block for code .
 */
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");

// **2. User Registration**
//@doc Register a user
//@route POST /register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  /*Create an API endpoint that allows users to register by providing their email, 
  password, and name.
*/
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
  // - Implement password hashing to securely store user passwords in the database.
  //   hash the password before saving to db
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  /*- Return a unique session token upon successful registration and store it in the 
    `sessions` collection.
*/
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

//**3. User Login**
//@doc Login a user
//@route POST  /login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  /*
  - Create an API endpoint that allows registered users to log in using their email and password.
 */
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fileds are mandetory");
  }
  //  - Verify the provided email and password against the stored user data.
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
    /*- Return a unique session token upon successful login and store it in the `sessions` collection.
     */
    const session = new Session({ userId: user._id, token });
    await session.save();
    res.status(200).json({ token });
  } else {
    res.status(400);
    throw new Error("email or password is not valid");
  }
});

// **4. User Logout**

//@doc Logout Current user
//@route GET  /api/user/logout
//@access private
const logoutUser = asyncHandler(async (req, res) => {
  //- Create an API endpoint that allows users to log out, invalidating their session token.
  const userId = req.user.id;
  if (!userId) {
    res.status(400);
    throw new Error("Token is missing");
  }
  const session = await Session.findOne({ userId });
  /*- Ensure that a user can have multiple sessions and can log out of a specific session while
    remaining logged in on other devices.
*/
  if (session) {
    await Session.deleteOne(session);
  }
  res.status(200).json({ mesg: "Logout Successfull" });
});

// **5. Session Management**
//@doc  Protected route (requires authentication)
//@route GET  /refresh
//@access private
const refreshToken = asyncHandler(async (req, res) => {
  //- Implement session management to handle token expiration and re-authentication.
  const userId = req.user.id;
  const user = await User.findOne({ _id: userId });
  //- Ensure session tokens have a limited lifespan (e.g., 24 hours).
  // Generate a new token with an extended expiration time
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
  //- Implement a token refresh mechanism to extend session validity.
  // Update the session with the new token
  const session = await Session.findOne({ userId });
  session.token = token;
  await session.save();
  res.json({ mesg: "New Token", token });
});
//@doc  Protected route (requires authentication)
//@route GET  /protected
//@access private
const protectedRoute = asyncHandler(async (req, res) => {
  res.json({ message: "This is a protected route" });
});
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  protectedRoute,
};
