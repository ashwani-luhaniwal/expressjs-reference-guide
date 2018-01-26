/**
 * -----------------------
 * ExpressJS - Middleware
 * -----------------------
 * Middleware functions are functions that have access to the request object (req), the response 
 * object (res), and the next middleware function in the application’s request-response cycle. These 
 * functions are used to modify req and res objects for tasks like parsing request bodies, adding 
 * response headers, etc.
 */
const express = require('express');
const app = express();

// Simple request time logger
app.use((req, res) => {
    console.log('A new request received at ' + Date.now());

    // This function call is very important. It tells that more processing is required for the current
    // request and is in the next middleware function route handler
    next();
});
// The above middleware is called for every request on the server. So after every request, we will get 
// the message in the console

// To restrict the above function frequency to a specific route (and all its subroutes), provide that 
// route as the first argument of app.use().
// Middleware function to log request protocol
app.use('/things', (req, res, next) => {
    console.log('A request for things received at ' + Date.now());
    next();
});

// Route handler that sends the response
app.get('/things', (req, res) => {
    res.send('Things');
});
// Now whenever you request any subroute of '/things', only then it will log the time.

app.listen(3000);