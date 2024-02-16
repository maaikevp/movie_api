const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');



const http = require('http');
const https = require('https');

const morgan = require('morgan');
const mongoose = require('mongoose');
const Models = require('./models.js');


const app = express();  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const path = require('path');

const Movies = Models.Movie;
const Users = Models.User;
const Directors = Models.Director;
const Genres = Models.Genre;

let PORT = process.env.PORT || 8080;



// usenewurlparser is deprecated
 // mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

//  const connectDB = ()=>{
  // mongoose.connect("mongodb://127.0.0.1:27017/test")
  mongoose.connect("mongodb://localhost:27017/test")
  .then(()=>{
     console.log("DB connection successful.");
  })
  .catch((err)=>{
     console.log(`DB connection error:${err}`);
  });
// }


app.use(morgan("common"));

//  Running nodemon - change .js file name in package.json under "scripts> dev nodemon"  to the the file you're going to run
//  npm run dev 


// let movies = [

//   {
//     Title : "The Godfather",
//     Description: "The patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
//     Genre: 
//       {
//         Name :"Crime",
//         Description: "Movies in this genre explore criminal activities, their consequences, and the moral dilemmas faced by the characters.",
//       },


//     Director:
//       {
//         Name: "Francis Ford Coppola",
//         bio : "Francis Ford Coppola is an American film director, producer, and screenwriter. He is best known for directing the critically acclaimed 'The Godfather trilogy' and the Vietnam War epic Apocalypse Now. Coppola has won multiple Academy Awards during his career and is considered one of the most influential filmmakers in the history of cinema.",
//         DOB : "April 7, 1939",

//       },

//     Actor: [
//         {
//           name: "Marlon Brando",
//           DOB: "April 3, 1924",
//         },
//         {
//           name: "Al Pacino",
//           DOB: "April 25, 1940" ,
//         },
//       ],
//     Release_date: 1972,
//     Rating: 9.2,
//     imageURL: "https://www.imdb.com/title/tt0068646/mediaviewer/rm746868224/?ref_=tt_ov_i",
//     Featured: false,
//   },

//   // {

//   //   "Title" : "Inception",
//   //   "Description": "A thief, who enters people's dreams to steal their secrets, is given a final job where he must implant an idea into someone's mind.",
//   //   "Genre":
//   //     {
//   //       "Name" :"Science Fiction",
//   //       "Description": "Sci-Fi films combine futuristic or scientific concepts with intense action sequences, often set in space, the future, or with advanced technology.",
//   //     },


//   //   "Director":
//   //     {
//   //       "Name": "Christopher Nolan",
//   //       "bio" : "Christopher Nolan is a British-American film director, producer, and screenwriter known for his work on films such as 'Inception', 'The Dark Knight Trilogy', 'Interstellar, and Dunkirk. Nolan is known for his innovative storytelling and contributions to the science fiction and superhero genres.",
//   //       "DOB" : "July 30, 1970",

//   //     },

//   //   "Actor": [
//   //       {
//   //         "name": " Leonardo DiCaprio",
//   //         "DOB": "November 11, 1974" ,
//   //       },
//   //       {
//   //         "name": " Joseph Gordon-Levitt",
//   //         "DOB": "February 17, 1981",
//   //       },
//   //       {
//   //         "name": "Ellen Page",
//   //         "DOB": "February 21, 1987" ,
//   //       },

//   //     ],
//   //   "Release_date": 2010 ,
//   //   "Rating": 8.8,
//   //   "imageURL": "https://www.imdb.com/title/tt1375666/mediaviewer/rm3426651392/?ref_=tt_ov_i",
//   //   "Featured": true,
//   //   },

//   {


//     Title : "The Shawshank Redemption",
//     Description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
//     Genre:
//        {
//       Name :"Drama",
//       Description: "Drama films portray realistic and emotional stories focusing on the characters' personal development and life challenges.",
//     },


//     Director:
//       {
//         Name: "Frank Darabont",
//         bio : "Frank Darabont is an American filmmaker, screenwriter, and director. He is renowned for his work in adapting Stephen King's stories into successful films, including 'The Shawshank Redemption' and 'The Green Mile.' Darabont is known for his skill in creating emotionally powerful and character-driven narratives.",
//         DOB : "January 28, 1959",

//       },

//     Actor: [
//         {
//           name: "Tim Robbins",
//           DOB: "October 16, 1958" ,
//         },
//         {
//           name: "Morgan Freeman",
//           DOB: "June 1, 1937",
//         },
//       ],
//     Release_date: 1994 ,
//     Rating: 9.3 ,
//     imageURL: "https://www.imdb.com/title/tt0111161/mediaviewer/rm1690056449/?ref_=tt_ov_i",
//     Featured: false,
//     },

//       {

//     Title : "The Dark Knight",
//     Description: "When the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
//     Genre:
//       {
//         Name :"Action",
//         Description: "Action movies feature characters with extraordinary abilities who engage in thrilling action sequences, typically battling supervillains to save the world.",
//       },

//     Director:
//       {
//         Name: "Christopher Nolan",
//         bio : "Christopher Nolan is a British-American film director, producer, and screenwriter known for his work on films such as 'Inception', 'The Dark Knight Trilogy', 'Interstellar, and Dunkirk. Nolan is known for his innovative storytelling and contributions to the science fiction and superhero genres.",
//         DOB : "July 30, 1970",
//       },

//     Actor: [
//         {
//           name: "Christian Bale",
//           DOB: "January 30, 1974",
//         },
//         {
//           name: "Heath Ledger",
//           DOB: "April 4, 1979",
//           Death: "January 22, 2008"
//         },
//       ],
//     Release_date: 2008 ,
//     Rating: 9.0 ,
//     imageURL: "https://www.imdb.com/title/tt0468569/mediaviewer/rm4023877632/?ref_=tt_ov_i/",
//     Featured: true,
//     },

//     {   
//     Title : "Forrest Gump",
//     Description: "Through three decades of U.S. history, a man with a low IQ witnesses and unwittingly influences several defining historical events in the 20th century United States.",
//     Genre:

//       {
//         Name :"Romance",
//         Description: "Romance films incorporate song and dance numbers to tell romantic stories, where music and choreography play a significant role in the narrative",
//       },

//     Director:
//       {
//         Name: "Robert Zemeckis",
//         bio : "Robert Zemeckis is an American filmmaker, screenwriter, and producer. He is famous for directing and co-writing the 'Back to the Future' trilogy, 'Forrest Gump,' 'Cast Away,' and 'Who Framed Roger Rabbit.' Zemeckis is known for his innovative use of visual effects and storytelling techniques in his films.",
//         DOB : "May 14, 1951",

//       },

//     Actor: [
//         {
//           name: "Tom Hanks",
//           DOB: "July 9, 1956" ,
//         },
//         {
//           name: "Robin WrightT",
//           DOB:  "April 8, 1966",
//         },
//       ],
//     Release_date: 1994,
//     Rating: 8.8,
//     imageURL: "https://www.imdb.com/title/tt0109830/mediaviewer/rm1954748672/?ref_=tt_ov_i",
//     Featured: false
//     },

// ];

// let users = [
//   { id: 1, name: "kim", favoriteMovies: ["Forrest Gump"] },
//   { id: 2, name: "joe", favoriteMovies: [] },
// ];


// Welcome message

app.get('/', (req, res) => {
  res.send("welcome to MyFlix app 2")
})

// Gets the list of data about ALL films

app.get('/movies', (req, res) => {
	Movies.find()
		.then((movies) => {
			res.status(200).json(movies);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: ' + err);
		});
});


// GET DETAILS SPECIFIC MOVIE

app.get('/movies/:Title', async (req, res) => {
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
    
app.get('/movies/genre/:Name', async (req, res) => {
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

app.get('/movies/director/:directorName', async (req, res) => {
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

// Get all users

app.get('/users', async (req, res) => {
  await Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// CREATE USER


// ADD A USER

/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users', async (req, res) => {
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});



// UPDATE USER

app.put('/users/:Username', async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  })

});



 // ADD MOVIE TO FAVORITES

 app.post('/users/:Username/movies/:MovieID', async (req, res) => {
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

app.delete('/users/:Username/movies/:MovieID', async (req, res) => {
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

app.delete('/users/:Username', async (req, res) => {
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



//  https://careerfoundry.wistia.com/medias/vrn5wiop9d


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


