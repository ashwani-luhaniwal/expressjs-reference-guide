/**
 * --------------------
 * Express - Form Data
 * --------------------
 * Forms are an integral part of the web. Almost every website we visit offers us forms that submit 
 * or fetch some information for us. To get started with forms, we will first install the 
 * body-parser(for parsing JSON and url-encoded data) and multer(for parsing multipart/form data) 
 * middleware.
 */
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const app = express();

app.get('/', (req, res) => {
    res.render('form');
});

app.set('view engine', 'pug');
app.set('views', 'Documentation/Form Data/views');

/**
 * After importing the body parser and multer, we will use the body-parser for parsing json and 
 * x-www-form-urlencoded header requests, while we will use multer for parsing multipart/form-data.
 */
// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

app.post('/', (req, res) => {
    // The req.body object contains your parsed request body. To use fields from that object, just 
    // use them like normal JS objects.
    console.log(req.body);
    res.send('received your request!');
});

app.listen(3000);