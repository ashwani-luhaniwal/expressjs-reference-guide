/**
 * ------------------------
 * ExpressJS - Restful API
 * ------------------------
 * An API is always needed to create mobile applications, single page applications, use AJAX calls 
 * and provide data to clients. An popular architectural style of how to structure and name these APIs 
 * and the endpoints is called REST(Representational Transfer State). HTTP 1.1 was designed keeping 
 * REST principles in mind. REST was introduced by Roy Fielding in 2000 in his Paper Fielding 
 * Dissertations.
 * 
 * RESTful URIs and methods provide us with almost all information we need to process a request. The 
 * table given below summarizes how the various verbs should be used and how URIs should be named. We 
 * will be creating a movies API towards the end; let us now discuss how it will be structured.
 */
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const upload = multer();
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

// Require the Router we defined in routes.js
const movies = require('./routes.js');

// Use the Router on the sub route/movies
app.use('/movies', movies);

app.listen(3000);