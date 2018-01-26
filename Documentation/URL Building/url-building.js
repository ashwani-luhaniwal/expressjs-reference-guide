/**
 * -------------------------
 * ExpressJS - URL Building
 * -------------------------
 * We can now define routes, but those are static or fixed. To use the dynamic routes, we SHOULD provide 
 * different types of routes. Using dynamic routes allows us to pass parameters and process based on them.
 */
const express = require('express');
const app = express();

app.get('/:id', (req, res) => {
    res.send('The id you specified is ' + req.params.id);
});

// You can use the req.params object to access all the parameters you pass in the url. Note that the 
// above 2 are different paths. They will never overlap. Also if you want to execute code when you 
// get '/things' then you need to define it separately.
app.get('/things/:name/:id', (req, res) => {
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
});

/**
 * -----------------------
 * Pattern Matched Routes
 * -----------------------
 * You can also use regex to restrict URL parameter matching.
 */
// id parameter will be 5-digit long number
// Note that this will only match the requests that have a 5-digit long id. You can use more complex 
// regexes to match/validate your routes. If none of your routes match the request, you'll get a 
// "Cannot GET <your-request-route>" message as response.
app.get('/things/:id([0-9]{5})', (req, res) => {
    res.send('id: ' + req.params.id);
});

// Other routes here or 404 page routes
// Important − This should be placed after all your routes, as Express matches routes from start to end 
// of the index.js file, including the external routers you required.
app.get('*', (req, res) => {
    res.send('Sorry, this is an invalid URL');
});

app.listen(3000);