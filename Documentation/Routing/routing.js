/**
 * ------------------
 * Express - Routing
 * ------------------
 * Web frameworks provide resources such as HTML pages, scripts, images, etc. at different routes.
 * The following function is used to define routes in an Express application −
 * 
 * --------------------------
 * app.method(path, handler)
 * --------------------------
 * This METHOD can be applied to any one of the HTTP verbs – get, set, put, delete. An alternate method 
 * also exists, which executes independent of the request type.
 *  - Path is the route at which the request will run.
 *  - Handler is a callback function that executes when a matching request type is found on the 
 *    relevant route.
 */
const express = require('express');
const app = express();
const routes = require('./router.js');

// the server receives a get request at route "/hello", our Express app executes the callback function 
// attached to this route and sends "Hello World!" as the response.
app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

// We can also have multiple different methods at the same route.
app.post('/hello', (req, res) => {
    res.send('You just called the post method at "/hello"!\n');
});

// A special method, all, is provided by Express to handle all types of http methods at a particular 
// route using the same function.
// This method is generally used for defining middleware
app.all('/test', (req, res) => {
    res.send('HTTP method doesn\'t have any effect on this route!');
});

// app.use function call on route '/things' attaches the 'routes' router with this route.
app.use('/things', routes);

app.listen(3000);