/**
 * --------------------------
 * Order of Middleware Calls
 * --------------------------
 * One of the most important things about middleware in Express is the order in which they are 
 * written/included in your file; the order in which they are executed, given that the route matches 
 * also needs to be considered.
 */
const express = require('express');
const app = express();

// First middleware before response is sent
app.use((req, res, next) => {
    console.log('Start');
    next();
});

// Route handler
app.get('/', (req, res, next) => {
    res.send('Middle');
    next();
});

app.use('/', (req, res) => {
    console.log('End');
});
// When we visit '/' after running this code, we receive the response as Middle and on our console −
//      Start
//      End

app.listen(3000);