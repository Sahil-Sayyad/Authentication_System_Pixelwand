// **6. Authentication Middleware**
/** 
- Create a middleware to authenticate API requests.
- Ensure that protected routes can only be accessed by users with a valid session token.
*/
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  let authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(400);
        throw new Error("user is not authorized");
      }

      req.user = decoded.user;
      next();
    });

    if (!token || !authHeader) {
      res.status(401);
      throw new Error("User is not authorized or token is missing ");
    }
  }
  if (!token || !authHeader) {
    res.status(401);
    throw new Error("User is not authorized or token is missing ");
  }
});

module.exports = authMiddleware;