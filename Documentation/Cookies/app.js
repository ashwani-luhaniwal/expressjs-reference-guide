/**
 * ------------------
 * Express - Cookies
 * ------------------
 * Cookies are simple, small files/data that are sent to client with a server request and stored on 
 * the client side. Every time the user loads the website back, this cookie is sent with the request. 
 * This helps us keep track of the user’s actions.
 * The following are the numerous uses of the HTTP Cookies −
 *      - Session management
 *      - Personalization(Recommendation systems)
 *      - User tracking
 * To use cookies with Express, we need the cookie-parser middleware. To install it, use the following 
 * code −
 * 
 *      npm install --save cookie-parser
 * 
 * Now to use cookies with Express, we will require the cookie-parser. cookie-parser is a middleware 
 * which parses cookies attached to the client request object. To use it, we will require it in our 
 * index.js file; this can be used the same way as we use other middleware. Here, we will use the 
 * following code.
 */
const express = require('express');
const app = express();
// cookie-parser is a middleware which parses cookies attached to the client request object.
const cookieParser = require('cookie-parser');

app.use(cookieParser());

// cookie-parser parses Cookie header and populates req.cookies with an object keyed by the cookie 
// names.
app.get('/', (req, res) => {
    res.cookie('name', 'express').send('cookie set');   // Sets name = express

    // The browser also sends back cookies every time it queries the server. To view cookies from 
    // your server, on the server console in a route, add the following code to that route.
    console.log('Cookies: ', req.cookies);
});

/**
 * ------------------------------------
 * Adding Cookies with Expiration Time
 * ------------------------------------
 * You can add cookies that expire. To add a cookie that expires, just pass an object with property 
 * 'expire' set to the time when you want it to expire. 
 */
app.get('/expire', (req, res) => {
    // Expire after 360000 ms from the time it is set.
    res.cookie(name, 'value', {expire: 360000 + Date.now()});

    // Another way to set expiration time is using 'maxAge' property. Using this property, we can 
    // provide relative time instead of absolute time.
    // This cookie also expires after 360000 ms from the time it is set
    res.cookie(name, 'value', {maxAge: 360000});
});

/**
 * --------------------------
 * Deleting existing cookies
 * --------------------------
 * To delete a cookie, use the clearCookie function. For example, if you need to clear a cookie 
 * named foo, use the following code.
 */
app.get('/clear_cookie_foo', (req, res) => {
    res.clearCookie('foo');
    res.send('cookie foo is cleared');
});

app.listen(3000);