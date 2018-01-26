/**
 * -------------------------
 * app.get(route, callback)
 * -------------------------
 * This function tells what to do when a get request at the given route is called. The callback function 
 * has 2 parameters, request(req) and response(res). The request object(req) represents the HTTP request 
 * and has properties for the request query string, parameters, body, HTTP headers, etc. Similarly, the 
 * response object represents the HTTP response that the Express app sends when it receives an HTTP 
 * request.
 * 
 * -----------
 * res.send()
 * -----------
 * This function takes an object as input and it sends this to the requesting client. Here we are sending 
 * the string "Hello World!".
 * 
 * -------------------------------------------------
 * app.listen(port, [host], [backlog], [callback]])
 * -------------------------------------------------
 * This function binds and listens for connections on the specified host and port. Port is the only 
 * required parameter here.
 *      - port: A port number on which the server should accept incoming requests.
 *      - host: Name of the domain. You need to set it when you deploy your apps to the cloud.
 *      - backlog: The maximum number of queued pending connections. The default is 511.
 *      - callback: An asynchronous function that is called when the server starts listening for requests.
 */

let express = require('express');
let app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000);