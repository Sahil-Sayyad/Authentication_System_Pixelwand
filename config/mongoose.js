/*
**1. Database Setup**
- Initialize a MongoDB database to store user data and session information.
- Implement the necessary fields in the `users` collection, including but not limited to:
    - `_id` (Unique Identifier)
    - `email` (Unique)
    - `password` (Hashed)
    - `name`
- Implement the necessary fields in the `sessions` collection, including but not limited to:
    - `_id` (Unique Identifier)
    - `userId` (Reference to the `users` collection)
    - `token`
    - `createdAt` (Timestamp)
*/

//importe required packages 
const mongoose = require("mongoose");

//connecting to the mongoDB
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(`Database Connected ${connect.connection.host} Database Name ${connect.connection.name}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;