# movie_api


## Backend for MyFlix movie-api

The MyFlix REST API (API = Application Programming Interface) is the server-side component of the Movie API web application. 

The API provides users of the movi-app with the possibility to: create/delete an account, log in/out, add/remove movies from your favorites list, view detailed movie data (e.g movie summary, genre, director) and view profile data (including personal list of favorite movies) 


## Systems and programs used:

Node.js: JavaScript runtime for server-side scripting.
Express.js: Node.js web application framework
Mongoose: Object Data Modeling (ODM) library for MongoDB and Node.js
Morgan: HTTP request logger middleware for Node.js
Body-Parser: Node.js body parsing middleware
Passport.js: Authentication middleware for Node.js
Bcrypt: Library for hashing passwords, enhancing security
CORS: Security feature Middleware enabling Cross-Origin Resource Sharing 
JSONWebToken: Implementation of JSON Web Tokens for authentication and authorization
lodash: makes JS easier by taking the hassle out of working with arrays, numbers, objects, strings, etc.


versions:
express: 4.18.2, mongoose: 8.1.1, morgan: 1.10.0, passport: 0.7.0, passport-jwt: 4.0.1, nodemon: 3.0.2,  lodash: 4.17.21, 


## External providers

Render: API is hosted on Render
Atlas Mongo DB: hosting the Database
Postman: user to test the endpoints of the requests