/**
 * -----------------
 * Express - Router
 * -----------------
 * Defining routes like above is very tedious to maintain. To separate the routes from our main index.js 
 * file, we will use Express.Router.
 * 
 * Routers are very helpful in separating concerns and keep relevant portions of our code together. 
 * They help in building maintainable code. You should define your routes relating to an entity in a 
 * single file and include it using the above method in your index.js file.
 */
let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    res.send('GET route on things.');
});
router.post('/', (req, res) => {
    res.send('POST route on things');
});

// export this router to use in our index.js or main app file
module.exports = router;