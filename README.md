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
-  <b>2.  User Login </b>
      <p>Endpoint: /login<br>
      Method: POST<br>
      Description: Allows registered users to log in by providing their email and password.<br>
      </p>
      
      Request Body:
  ```json
            {
              "email": "user@example.com",
              "password": "password123"
            }
 ```

   Response:
```json
            {
              "token": "your-generated-jwt-token"
            }
```
-  <b>3.  User Logout </b>

     <p> Endpoint: /logout<br>
      Method: POST<br>
      Description: Allows users to log out of a specific session, invalidating the provided session token.<br>
     </p>
     
      Request Headers:
      Authorization: Bearer your-jwt-token

      Response:
   
            {
              "message": "Logout successful"
            }

-  <b>4.  Token Refresh </b>

     <p>Endpoint: /refresh<br>
      Method: POST<br>
      Description: Allows users to refresh their session token, extending their session's validity.<br>
      </p> 
      
      Request Headers:
      Authorization: Bearer your-jwt-token
   
      Response:
   
            {
              "token": "your-newly-generated-jwt-token"
            }

  ## Authentication Flow
      To use protected endpoints (e.g., /logout, /refresh),<br>
      include the JWT token in the Authorization header as follows: Bearer your-jwt-token.

## Getting Started

<b>To get started with the Pixelwand authentication system, follow these steps:</b>

-  <b> 1. &nbsp; Clone Git Repo  </b>
<br>----<i> git clone https://github.com/Sahil-Sayyad/Quora_Clone.git</i><br><br>
-  <b> 2. &nbsp;Install NPM dependencies </b>
   <br>----<i> npm install</i> <br>
- 3.Register a new user by making a POST request to /register with the required user information.

- 4.Log in by making a POST request to /login with your email and password.

- 5.Use the generated JWT token in the Authorization header for protected endpoints (e.g., /logout, /refresh).

- 6.To log out, make a POST request to /logout with the JWT token in the Authorization header.

- 7.To refresh your token, make a POST request to /refresh with the JWT token in the Authorization header.

