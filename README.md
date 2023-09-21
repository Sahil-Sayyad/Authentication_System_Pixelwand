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
              "username": "John Doe"
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
      Method: GET<br>
      Description: Allows users to log out of a specific session, invalidating the provided session token.<br>
     </p>
     
      Request Headers:<br>
      Authorization: Bearer your-jwt-token

      Response:
   
            {
              "message": "Logout successful"
            }

-  <b>4.  Token Refresh </b>

     <p>Endpoint: /refresh<br>
      Method: GET<br>
      Description: Allows users to refresh their session token, extending their session's validity.<br>
      </p> 
      
      Request Headers:<br>
      Authorization: Bearer your-jwt-token
   
      Response:
   
            {
              "token": "your-newly-generated-jwt-token"
            }
-  <b>5.  Protected Route </b>

     <p>Endpoint: /protected<br>
      Method: GET<br>
      Description: Allows only those authenticated users .<br>
      </p> 
      
      Request Headers:<br>
      Authorization: Bearer your-jwt-token
   
      Response:
   
            {
              "message": "This is a protected route"
            }

   ## Authentication Flow
      To use protected endpoints (/logout, /refresh, /protected),  <br>
      include the JWT token in the Authorization header as follows: <br>
      Bearer your-jwt-token.

   <b>ScreenShot How To Add Bearer Token</b><br><br>
   
![Screenshot (148)](https://github.com/Sahil-Sayyad/MongoDB_Authentication_System_Pixelwand/assets/96423459/242608ae-eefc-4692-86fe-ed11ac23e84f)

## Getting Started

<b>To get started with the Pixelwand authentication system, follow these steps:</b>

-  <b> 1. &nbsp; Clone Git Repo  </b>
   <br>----<i> git clone https://github.com/Sahil-Sayyad/MongoDB_Authentication_System_Pixelwand.git</i><br><br>
-  <b> 2. &nbsp;Install NPM dependencies </b>
   <br>----<i> npm install</i> <br>
- 3. Register a new user by making a POST request to /register with the required user information.
- 4. Log in by making a POST request to /login with your email and password.
- 5. Use the generated JWT token in the Authorization header for protected endpoints (/logout, /refresh, /protected).
- 6. To log out, make a GET request to /logout with the JWT token in the Authorization header.
- 7. To refresh your token, make a GET request to /refresh with the JWT token in the Authorization header.
- 7. To see protected route, make a GET request to /protected with the JWT token in the Authorization header.

