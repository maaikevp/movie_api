const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();

app.use(bodyParser.json());


const http = require('http');

// CREATE SERVER 

// http.createServer((request, response) => {
//   response.writeHead(200, {'Content-Type': 'text/plain'});
//   response.end('Hello Node!\n');
// }).listen(8080);

console.log('My first Node test server is running on Port 8080.');


// Gets the list of data about ALL films

app.get('/movies', (req, res) => {
    res.json(movies);
})


// GET DETAILS SPECIFIC MOVIE

app.get('/movies/:title', (req,res) => {
    const { title } = app.params;  //deconstructed coding
    const movie = movies.find(movie => movie.Title === title);

    if (movie) {
        res.status(201).json(movies);
    } else {
    res.status(400).send('no such movie')
    }
})   

// GET DETAILS GENRE
    
app.get('/movies/genre/:genreName', (req,res) => {
    const { genreName } = app.params;  //deconstructed coding
    const genre = movies.find(movie => movie.Genre.name === genreName).Genre;

    if (genre) {
        res.status(201).json(genre);
    } else {
    res.status(400).send('no such genre')
    }
})   

// DIRECTOR

app.get('/movies/directors/:directorName', (req,res) => {
    const { directorName } = app.params;  //deconstructed coding
    const director = movies.find(movie => movie.Director.name === directorName).Director;

    if (director) {
        res.status(201).json(director);
    } else {
    res.status(400).send('no such director')
    }
})   


// CREATE USER

app.post('/users/', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).newUser;
    }
    else res.status(400).send('Please type username')
})

// UPDATE USER

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;  // updated array being sent in request

    let user = users.find(user => user.id == id); // 2 == because of comparison num vs txt - trusy/falsy

    if (user) {
        user.name = updatedUser.name;
        res.status(201).json(user);
    }
    else res.status(400).send('no such user')
})

 // ADD MOVIE TO FAVORITES

 app.put('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;
    const updatedUser = req.body;  // updated array being sent in request

    let user = users.find(user => user.id == id); // 2 == because of comparison num vs txt - trusy/falsy

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(201).send(`$(movieName) has been added to user ${id}'s array`);
    }
    else {}
    res.status(400).send('no such movie')
 })

// DELETE MOVIE FROM FAVORITES

app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;
    const updatedUser = req.body;  // updated array being sent in request

    let user = users.find(user => user.id == id); // 2 == because of comparison string to num - trusy/falsy

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
        res.status(201).send(`${movieTitle} has been removed to user ${id}'s array`);
    }
    else {}
    res.status(400).send('no such movie')
 })


// DELETE USER

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;  // updated array being sent in request

    let user = users.find(user => user.id == id); // 2 == because of comparison string to num - trusy/falsy

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter(user => user.id != id);
        res.status(201).send(`${id} has been removed`);
    }
    else {}
    res.status(400).send('no such movie')
 })




//  https://careerfoundry.wistia.com/medias/vrn5wiop9d




let movies = [
    {
      title: "starwars",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      genre: { name: "drama", description: "genre description here" },
      director: {
        name: "director1",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        born: 1940,
        death: "",
      },
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Foriginalvintagemovieposters.com%2Fwp-content%2Fuploads%2F2018%2F06%2FStar-Wars-5672-768x1162.jpg&f=1&nofb=1&ipt=d191eb7a7592ede00a4efb69d08105b59832ac04e24f4d6e8eab7df59bc5537b&ipo=images",
      feature: true,
    },
    {
      title: "film 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      genre: { name: "thriller", description: "genre description here" },
      director: {
        name: "director 1",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        born: 1940,
        death: "",
      },
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Foriginalvintagemovieposters.com%2Fwp-content%2Fuploads%2F2018%2F06%2FStar-Wars-5672-768x1162.jpg&f=1&nofb=1&ipt=d191eb7a7592ede00a4efb69d08105b59832ac04e24f4d6e8eab7df59bc5537b&ipo=images",
      feature: true,
    },
    {
      title: "film 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      genre: { name: "thriller", description: "genre description here" },
      director: {
        name: "director 2",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        born: 1945,
        death: "",
      },
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Foriginalvintagemovieposters.com%2Fwp-content%2Fuploads%2F2018%2F06%2FStar-Wars-5672-768x1162.jpg&f=1&nofb=1&ipt=d191eb7a7592ede00a4efb69d08105b59832ac04e24f4d6e8eab7df59bc5537b&ipo=images",
      feature: true,
    },

    {
        title: "film 4",
        director: "director 4",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        genre: { name: "kids", description: "genre description here" },
        director: {
          name: "director 2",
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          born: 1945,
          death: "",
        },
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Foriginalvintagemovieposters.com%2Fwp-content%2Fuploads%2F2018%2F06%2FStar-Wars-5672-768x1162.jpg&f=1&nofb=1&ipt=d191eb7a7592ede00a4efb69d08105b59832ac04e24f4d6e8eab7df59bc5537b&ipo=images",
        feature: true,
      },
      {
        title: "film 5",
        director: "director 5",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        genre: { name: "comedy", description: "genre description here" },
        director: {
          name: "director 2",
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          born: 1945,
          death: "",
        },
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Foriginalvintagemovieposters.com%2Fwp-content%2Fuploads%2F2018%2F06%2FStar-Wars-5672-768x1162.jpg&f=1&nofb=1&ipt=d191eb7a7592ede00a4efb69d08105b59832ac04e24f4d6e8eab7df59bc5537b&ipo=images",
        feature: true,
      }
    ];

    let users = [
        { id: 1, name: "kim", favoriteMovies: [] },
        { id: 2, name: "joe", favoriteMovies: [] },
      ];


      app.listen(8080, () => {
        console.log('Your app is listening on port 8080');
      });