#  Authentication System API
<p>This API provides user registration, login, logout, and token refresh functionality for the Pixelwand application.</p>

Base URL: https://your-api-url.com

Endpoints
1. User Registration
Endpoint: /register
Method: POST
Description: Allows users to create a new account by providing their email, password, and name.

Request Body:
```json
   {
  "email": "user@example.com",
  "password": "password123",
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
