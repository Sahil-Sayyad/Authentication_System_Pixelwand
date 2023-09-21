#  Authentication System API
<b>This API provides user registration, login, logout, and token refresh functionality for the Pixelwand application.</b>

Base URL: http://localhost:8000

## Endpoints
-  <b>1. User Registration </b>
      <p>Endpoint: /register<br>
         Method: POST<br>
         Description: Allows users to create a new account by providing their email, password, and name.<br>
      </p>
      Request Body:
```json
            {
              "email": "user@example.com",
              "password": "password123",
              "confirm_password:"password123",
              "name": "John Doe"
            }
```


       
        Response:
      
```json
            {
              "token": "your-generated-jwt-token"
            }

```

2. User Login
Endpoint: /login
Method: POST
Description: Allows registered users to log in by providing their email and password.
Request Body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
Response:
{
  "token": "your-generated-jwt-token"
}

3. User Logout
Endpoint: /logout
Method: POST
Description: Allows users to log out of a specific session, invalidating the provided session token.
Request Headers:

Authorization: Bearer your-jwt-token
Response:

{
  "message": "Logout successful"
}
4.Token Refresh
Endpoint: /refresh
Method: POST
Description: Allows users to refresh their session token, extending their session's validity.
Request Headers:

Authorization: Bearer your-jwt-token
Response:
{
  "token": "your-newly-generated-jwt-token"
}

Authentication Flow
To use protected endpoints (e.g., /logout, /refresh), include the JWT token in the Authorization header as follows: Bearer your-jwt-token.

Getting Started
1.To get started with the Pixelwand authentication system, follow these steps:

2.Register a new user by making a POST request to /register with the required user information.

3.Log in by making a POST request to /login with your email and password.

4.Use the generated JWT token in the Authorization header for protected endpoints (e.g., /logout, /refresh).

5.To log out, make a POST request to /logout with the JWT token in the Authorization header.

6.To refresh your token, make a POST request to /refresh with the JWT token in the Authorization header.

