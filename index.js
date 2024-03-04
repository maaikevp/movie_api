const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');


const http = require('http');
const https = require('https');

const morgan = require('morgan');
const mongoose = require('mongoose');
const Models = require('./models.js');


const process = require('process');
require('dotenv').config();

const app = express();

const { check, validationResult } = require('express-validator');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const path = require('path');

const Movies = Models.Movie;
const Users = Models.User;
const Directors = Models.Director;
const Genres = Models.Genre;

// let PORT = process.env.PORT || 8080;


const passport = require('passport');
require('./passport');

// Needs to be placed after body-parser
let auth = require('./auth')(app);


//  Running nodemon - change .js file name in package.json under "scripts> dev nodemon"  to the the file you're going to run
//  npm run dev 
//  Start up mongo locally for testing:  ("mongodb://localhost:27017/test")) - switch mongodb on on computer
//  Run code on server: (process.env.CONNECTION_URI) - update github - push updated code to server - run there


// CONNECTION 

mongoose.connect(process.env.CONNECTION_URI)
  .then(() => {
    console.log("DB connection successful.");
  })
  .catch((err) => {
    console.log(`DB connection error:${err}`);
  });


// CORS 

const cors = require('cors');
app.use(cors());

/* rest of code goes here*/
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com', 'http://localhost:1234', 'http://localhost:56433', 'http://localhost:10000',
  'https://testingmovie-apionrender.onrender.com', 'https://testingmovie-apionrender.onrender.com/users', 'https://testingmovie-apionrender.onrender.com/login'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) { // If a specific origin isn’t found on the list of allowed origins
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));


app.use(morgan("common"));


// Welcome message

app.get('/', (req, res) => {
  res.send("welcome to MyFlix app")
})

// Gets the list of data about ALL films

app.get('/movies', async (req, res) => {
  await Movies.find()
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// passport.authenticate('jwt', { session: false }),  

// GET DETAILS SPECIFIC MOVIE

app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Movies.find({ 'Title': req.params.Title })
    .then((movie) => {
      if (!movie) {
        res.status(400).send(req.params.title + ' was not found');
      } else {
        res.status(200).json(movie);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// GET DETAILS GENRE

app.get('/movies/genre/:Name', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Movies.findOne({ 'Genre.Name': req.params.Name })
    .then((movie) => {
      if (!movie) {
        res.status(400).send(req.params.Name + ' was not found');
      } else {
        res.status(200).json(movie.Genre.Description);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});



// DIRECTOR

app.get('/movies/director/:directorName', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Movies.findOne({ 'Director.Name': req.params.directorName })
    .then((movie) => {
      if (!movie) {
        res.status(400).send(req.params.title + ' was not found');
      } else {
        res.status(201).json(movie.Director);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// USERS

// Get all users - only for own checkups

// app.get('/users', async (req, res) => {
app.get('/users', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// CREATE USER    // ADD A USER

/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/

app.post('/users',
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
  [
    check('Username', 'Username is required').isLength({ min: 5 }),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ], async (req, res) => {

    // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    await Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
      .then((user) => {
        if (user) {
          //If the user is found, send a response that it already exists
          return res.status(400).send(req.body.Username + ' already exists');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: hashedPassword,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) => { res.status(201).json(user) })
            .catch((error) => {
              console.error(error);
              res.status(500).send('Error: ' + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });


// UPDATE USER

app.put('/users/:Username', passport.authenticate('jwt', { session: false }),
  [
    check('Username', 'Username is required').isLength({ min: 5 }),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ],
  async (req, res) => {

    // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // CONDITION ENDS
    let hashedPassword = Users.hashPassword(req.body.Password);

    await Users.findOneAndUpdate({ Username: req.params.Username }, {
      $set:
      {
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },

      { new: true }) // This line makes sure that the updated document is returned
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error: ' + err);
      })
  });


// ADD MOVIE TO FAVORITES

app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
  // CONDITION TO CHECK ADDED HERE
  if (req.user.Username !== req.params.Username) {
    return res.status(400).send('Permission denied');
  }
  // CONDITION ENDS
  await Users.findOneAndUpdate({ Username: req.params.Username }, {
    $push: { FavoriteMovies: req.params.MovieID }
  },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// DELETE MOVIE FROM FAVORITES

app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => {

  // CONDITION TO CHECK ADDED HERE
  if (req.user.Username !== req.params.Username) {
    return res.status(400).send('Permission denied');
  }
  // CONDITION ENDS
  await Users.findOneAndUpdate({ Username: req.params.Username }, {
    $pull: { FavoriteMovies: req.params.MovieID }
  },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.json(updatedUser);
      //   return res.status(201).send(`${movieTitle} has been removed from user ${id}'s array`);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// DELETE USER

app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  // CONDITION TO CHECK ADDED HERE
  if (req.user.Username !== req.params.Username) {
    return res.status(400).send('Permission denied');
  }
  // CONDITION ENDS
  await Users.findOneAndDelete({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// PORT

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on Port ' + port);
});


