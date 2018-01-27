/**
 * ---------------------
 * ExpressJS - Database
 * ---------------------
 * We keep receiving requests, but end up not storing them anywhere. We need a Database to store the 
 * data. For this, we will make use of the NoSQL database called MongoDB.
 * 
 * In order to use Mongo with Express, we need a client API for node. There are multiple options for 
 * us, but for this example, we will stick to mongoose. Mongoose is used for document Modeling in Node 
 * for MongoDB. For document modeling, we create a Model (much like a class in document oriented 
 * programming), and then we produce documents using this Model (like we create documents of a 
 * class in OOP). All our processing will be done on these "documents", then finally, we will write 
 * these documents in our database.
 * 
 * --------------------
 * Setting up Mongoose
 * --------------------
 * Now that you have installed Mongo, let us install Mongoose, the same way we have been installing 
 * our other node packages −
 * 
 *      npm install --save mongoose
 * 
 * Before we start using mongoose, we have to create a database using the Mongo shell. To create a new 
 * database, open your terminal and enter "mongo". A Mongo shell will start, enter the following code −
 * 
 *      use my_db
 * 
 * A new database will be created for you. Whenever you open up the mongo shell, it will default to 
 * "test" db and you will have to change to your database using the same command as above.
 * 
 * ---------------------
 * Retrieving Documents
 * ---------------------
 * Mongoose provides a lot of functions for retrieving documents, we will focus on 3 of those. All 
 * these functions also take a callback as the last parameter, and just like the save function, their 
 * arguments are error and response. The three functions are as follows
 * 
 * ---------------------------------
 * Model.find(conditions, callback)
 * ---------------------------------
 * This function finds all the documents matching the fields in conditions object. Same operators used 
 * in Mongo also work in mongoose. For example,
 * 
 *      Person.find(function(err, response){
 *          console.log(response);
 *      });
 * 
 * This will fetch all the documents from the person's collection.
 * 
 *      Person.find({name: "Ayush", age: 20}, function(err, response){
 *          console.log(response);
 *      });
 * 
 * This will fetch all documents where field name is "Ayush" and age is 20.
 * 
 * We can also provide projection we need, i.e., the fields we need. For example, if we want only the 
 * names of people whose nationality is "Indian", we use −
 * 
 *      Person.find({nationality: "Indian"}, "name", function(err, response){
 *          console.log(response);
 *      });
 * 
 * ------------------------------------
 * Model.findOne(conditions, callback)
 * ------------------------------------
 * This function always fetches a single, most relevant document. It has the same exact arguments as 
 * Model.find().
 * 
 * -----------------------------
 * Model.findById(id, callback)
 * -----------------------------
 * This function takes in the _id(defined by mongo) as the first argument, an optional projection 
 * string and a callback to handle the response. For example,
 * 
 *      Person.findById("507f1f77bcf86cd799439011", function(err, response){
 *          console.log(response);
 *      });
 * 
 * -------------------
 * Updating Documents
 * -------------------
 * Mongoose provides 3 functions to update documents.
 * 
 * -------------------------------------------
 * Model.update(condition, updates, callback)
 * -------------------------------------------
 * This function takes a conditions and updates an object as input and applies the changes to all the 
 * documents matching the conditions in the collection. For example, following code will update the 
 * nationality "American" in all Person documents −
 * 
 *      Person.update({age: 25}, {nationality: "American"}, function(err, response){
 *          console.log(response);
 *      });
 * 
 * -----------------------------------------------------
 * Model.findOneAndUpdate(condition, updates, callback)
 * -----------------------------------------------------
 * It finds one document based on the query and updates that according to the second argument. It also 
 * takes a callback as last argument. Let us perform the following example to understand the function
 * 
 *      Person.findOneAndUpdate({name: "Ayush"}, {age: 40}, function(err, response) {
 *          console.log(response);
 *      });
 * 
 * -----------------------------------------------
 * Model.findByIdAndUpdate(id, updates, callback)
 * -----------------------------------------------
 * This function updates a single document identified by its id. For example,
 * 
 *      Person.findByIdAndUpdate("507f1f77bcf86cd799439011", {name: "James"}, function(err, response){
 *          console.log(response);
 *      });
 * 
 * -------------------
 * Deleting Documents
 * -------------------
 * We have covered Create, Read and Update, now we will see how Mongoose can be used to Delete 
 * documents. We have 3 functions here, exactly like update.
 * 
 * ------------------------------------
 * Model.remove(condition, [callback])
 * ------------------------------------
 * This function takes a condition object as input and removes all documents matching the conditions. 
 * For example, if we need to remove all people aged 20, use the following syntax −
 * 
 *      Person.remove({age:20});
 * 
 * ----------------------------------------------
 * Model.findOneAndRemove(condition, [callback])
 * ----------------------------------------------
 * This functions removes a single, most relevant document according to conditions object. Let us 
 * execute the following code to understand the same.
 * 
 *      Person.findOneAndRemove({name: "Ayush"});
 * 
 * ----------------------------------------
 * Model.findByIdAndRemove(id, [callback])
 * ----------------------------------------
 * This function removes a single document identified by its id. For example,
 * 
 *      Person.findByIdAndRemove("507f1f77bcf86cd799439011");
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db');

// Now our app is connected to our database, let us create a new Model. This model will act as a 
// collection in our database. To create a new Model, use the following code, before defining any route
let personSchema = mongoose.Schema({
    name: String,
    age: Number,
    nationality: String
});
let Person = mongoose.model('Person', personSchema);
// The above code defines the schema for a person and is used to create a Mongoose Model Person.

app.get('/person', (req, res) => {
    res.render('person');
});

app.set('view engine', 'pug');
app.set('views', 'Documentation/Database/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/person', (req, res) => {
    let personInfo = req.body;  // Get the parsed information

    if (!personInfo.name || !personInfo.age || !personInfo.nationality) {
        res.render('show_message', {
            message: 'Sorry, you provided wrong info', type: 'error'
        });
    } else {
        // create newPerson document from Person model
        let newPerson = new Person({
            name: personInfo.name,
            age: personInfo.age,
            nationality: personInfo.nationality
        });

        // This is defined in Mongoose and accepts a callback as argument. This callback has 2 
        // arguments – error and response. These arguments will render the show_message view.
        newPerson.save((err, Person) => {
            if (err) {
                res.render('show_message', {
                    message: 'Database error', type: 'error'
                });
            } else {
                res.render('show_message', {
                    message: 'New person added', type: 'success', person: personInfo
                });
            }
        });
    }
});

// get records of all people
app.get('/people', (req, res) => {
    Person.find((err, response) => {
        res.json(response);
    });
});

// update people by id
app.put('/people/:id', (req, res) => {
    Person.findByIdAndUpdate(req.params.id, req.body, (err, response) => {
        if (err) {
            res.json({ message: 'Error in updating person with id ' + req.params.id });
        }
        res.json(response);
    });
});

// delete people by id
app.delete('/people/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id, (err, response) => {
        if (err) {
            res.json({ message: 'Error in deleting record id ' + req.params.id });
        } else {
            res.json({ message: 'Person with id ' + req.params.id + ' removed.' });
        }
    });
});

app.listen(3000);