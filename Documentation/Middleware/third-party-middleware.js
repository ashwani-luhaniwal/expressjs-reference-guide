/**
 * -----------------------
 * Third Party Middleware
 * -----------------------
 * 
 * ------------
 * body-parser
 * ------------
 * This is used to parse the body of requests which have payloads attached to them. To mount body parser, 
 * we need to install it using npm install --save body-parser and to mount it, include the following 
 * lines in your index.js 
 */
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }));

// To parse json data
app.use(bodyParser.json());

/**
 * --------------
 * cookie-parser
 * --------------
 * It parses Cookie header and populate req.cookies with an object keyed by cookie names. To mount 
 * cookie parser, we need to install it using npm install --save cookie-parser and to mount it, include 
 * the following lines in your index.js 
 */
const cookieParser = require('cookie-parser');
app.use(cookieParser());

/**
 * ----------------
 * express-session
 * ----------------
 * It creates a session middleware with the given options.
 */