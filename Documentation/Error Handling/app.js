/**
 * ---------------------------
 * ExpressJS - Error Handling
 * ---------------------------
 * Error handling in Express is done using middleware. But this middleware has special properties. 
 * The error handling middleware are defined in the same way as other middleware functions, except 
 * that error-handling functions MUST have four arguments instead of three – err, req, res, next. 
 * 
 * Till now we were handling errors in the routes itself. The error handling middleware allows us to 
 * separate our error logic and send responses accordingly. The next() method we discussed in 
 * middleware takes us to next middleware/route handler.
 */
const express = require('express');
const app = express();

// For error handling, we have the next(err) function. A call to this function skips all middleware 
// and matches us to the next error handler for that route. 
app.get('/', (req, res) => {
    // Create an error and pass it to the next function
    let err = new Error('Something went wrong');
    next(err);
});

// error handling middleware
// This error handling middleware can be strategically placed after routes or contain conditions to 
// detect error types and respond to the clients accordingly.
app.use((err, req, res, next) => {
    res.status(500);
    res.send('Oops, something went wrong');
});

app.listen(3000);