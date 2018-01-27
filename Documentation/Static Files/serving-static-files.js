/**
 * ---------------------------------
 * ExpressJS - Serving Static Files
 * ---------------------------------
 * Static files are files that clients download as they are from the server. Create a new directory, 
 * public. Express, by default does not allow you to serve static files. You need to enable it using 
 * the following built-in middleware.
 * 
 *      app.use(express.static('public'));
 * 
 * Note − Express looks up the files relative to the static directory, so the name of the static 
 * directory is not part of the URL.
 * 
 * Note that the root route is now set to your public dir, so all static files you load will be 
 * considering public as root. To test that this is working fine, add any image file in your new public 
 * dir and change its name to "testimage.jpg".
 * 
 * ----------------------------
 * Multiple Static Directories
 * ----------------------------
 * We can also set multiple static assets directories using the following program −
 */
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.static('images'));

/**
 * --------------------
 * Virtual Path Prefix
 * --------------------
 * We can also provide a path prefix for serving static files. For example, if you want to provide a 
 * path prefix like '/static', you need to include the following code in your index.js file 
 * 
 * Now whenever you need to include a file, for example, a script file called main.js residing in your 
 * public directory, use the following script tag −
 * 
 *      <script src = "/static/main.js" />
 * 
 * This technique can come in handy when providing multiple directories as static files. These prefixes 
 * can help distinguish between multiple directories.
 */
app.use('/static', express.static('public'));

app.listen(3000);