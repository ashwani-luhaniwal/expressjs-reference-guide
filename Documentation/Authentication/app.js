/**
 * ---------------------------
 * ExpressJS - Authentication
 * ---------------------------
 * Authentication is a process in which the credentials provided are compared to those on file in 
 * a database of authorized users' information on a local operating system or within an authentication 
 * server. If the credentials match, the process is completed and the user is granted authorization for 
 * access.
 * 
 * For us to create an authentication system, we will need to create a sign up page and a user-password 
 * store. The following code creates an account for us and stores it in memory. This is just for the 
 * purpose of demo; it is recommended that a persistent storage (database or files) is always used to 
 * store user information.
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.set('view engine', 'pug');
app.set('views', 'Documentation/Authentication/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cookieParser());
app.use(session({secret: 'Your secret key'}));

let Users = [];

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', (req, res) => {
    if (!req.body.id || !req.body.password) {
        res.status('400');
        res.send('Invalid details!');
    } else {
        Users.filter((user) => {
            if (user.id === req.body.id) {
                res.render('signup', {
                    message: 'User Already Exists! Login or choose another user id'
                });
            }
        });
        let newUser = {id: req.body.id, password: req.body.password};
        Users.push(newUser);
        req.session.user = newUser;
        res.redirect('/protected_page');
    }
});

// check if user is signed in
function checkSignIn(req, res) {
    if (req.session.user) {
        next(); // If session exists, proceed to page
    } else {
        let err = new Error('Not logged in!');
        console.log(req.session.user);
        next(err);  // Error, trying to access unauthorized page!
    }
}

app.get('/protected_page', (req, res) => {
    res.render('protected_page', {
        id: req.session.user.id
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

// It is always recommended that we use a persistent session system and use hashes for password 
// transport. There are much better ways to authenticate users now, leveraging JSON tokens.
app.post('/login', (req, res) => {
    console.log(Users);
    if (!req.body.id || !req.body.password) {
        res.render('login', {
            message: 'Please enter both id and password'
        });
    } else {
        Users.filter((user) => {
            if (user.id === req.body.id && user.password === req.body.password) {
                req.session.user = user;
                res.redirect('/protected_page');
            }
        });
        res.render('login', {
            message: 'Invalid credentials!'
        });
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        console.log('user logged out.');
    });
    res.redirect('/login');
});

app.use('/protected_page', (err, req, res, next) => {
    console.log(err);
    // User should be authenticated! Redirect him to login page
    res.redirect('/login');
});

app.listen(3000);