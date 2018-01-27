/**
 * -----------------------
 * ExpressJS - Templating
 * -----------------------
 * Pug is a templating engine for Express. Templating engines are used to remove the cluttering of our 
 * server code with HTML, concatenating strings wildly to existing HTML templates. Pug is a very powerful 
 * templating engine which has a variety of features including filters, includes, inheritance, 
 * interpolation, etc. There is a lot of ground to cover on this.
 * 
 * --------------------------
 * Important Features of Pug
 * --------------------------
 * 
 * ------------
 * Simple Tags
 * ------------
 * Tags are nested according to their indentation. Like in the above example, <title> was indented within 
 * the <head> tag, so it was inside it. But the <body> tag was on the same indentation, so it was a 
 * sibling of the <head> tag.
 * We don’t need to close tags, as soon as Pug encounters the next tag on same or outer indentation level, 
 * it closes the tag for us.
 * 
 * To put text inside of a tag, we have 3 methods −
 *  - Space seperated
 * 
 *      h1 Welcome to Pug
 * 
 *  - Piped text
 * 
 *      div
 *          | To insert multiline text, 
 *          | You can use the pipe operator.
 * 
 *  - Block of text
 * 
 *      div.
 *          But that gets tedious if you have a lot of text.
 *          You can use "." at the end of tag to denote block of text.
 *          To put tags inside this block, simply enter tag in a new line and 
 *          indent it accordingly.
 * 
 * ---------
 * Comments
 * ---------
 * Pug uses the same syntax as JavaScript(//) for creating comments. These comments are converted to 
 * the html comments(<!--comment-->). For example,
 * 
 *      //This is a Pug comment
 * 
 * This comment gets converted to the following.
 *  
 *      <!--This is a Pug comment-->
 * 
 * -----------
 * Attributes
 * -----------
 * To define attributes, we use a comma separated list of attributes, in parenthesis. Class and ID 
 * attributes have special representations. The following line of code covers defining attributes, 
 * classes and id for a given html tag.
 * 
 *      div.container.column.main#division(width = "100", height = "100")
 * 
 * This line of code, gets converted to the following. −
 * 
 *      <div class = "container column main" id = "division" width = "100" height = "100"></div>
 * 
 */
const express = require('express');
const app = express();

// Now that Pug is installed, set it as the templating engine for your app. You don't need to 'require' 
// it. Add the following code to your index.js file.
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/first_template', (req, res) => {
    res.render('first_view');
});

/**
 * ----------------------------
 * Passing Values to Templates
 * ----------------------------
 * When we render a Pug template, we can actually pass it a value from our route handler, which we can 
 * then use in our template.
 */
app.get('/dynamic_view', (req, res) => {
    res.render('dynamic', {
        name: 'Ashwani Luhaniwal',
        url: 'https://github.com/ashwani-luhaniwal'
    });
});

// Conditionals
// We can use conditional statements and looping constructs as well.
app.get('/login', (req, res) => {
    res.render('/login', {
        user: {name: 'Ashwani', age: '28'}
    });
});

/**
 * -----------------------
 * Include and Components
 * -----------------------
 * Pug provides a very intuitive way to create components for a web page. For example, if you see a 
 * news website, the header with logo and categories is always fixed. Instead of copying that to every 
 * view we create, we can use the include feature.
 */
app.get('/components', (req, res) => {
    res.render('content');
});

app.listen(3000);