const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const http = require('http');


//  Running nodemon - change .js file name in package.json under scripts> dev nodemon 
//  npm run dev 

// CREATE SERVER 

// http.createServer((request, response) => {
//   response.writeHead(200, {'Content-Type': 'text/plain'});
//   response.end('Hello Node!\n');
// }).listen(8080);

// console.log('My first Node test server is running on Port 8080.');


let movies = [

  {
    Title : "The Godfather",
    Description: "The patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    Genre: 
      {
        Name :"Crime",
        Description: "Movies in this genre explore criminal activities, their consequences, and the moral dilemmas faced by the characters.",
      },


    Director:
      {
        Name: "Francis Ford Coppola",
        bio : "Francis Ford Coppola is an American film director, producer, and screenwriter. He is best known for directing the critically acclaimed 'The Godfather trilogy' and the Vietnam War epic Apocalypse Now. Coppola has won multiple Academy Awards during his career and is considered one of the most influential filmmakers in the history of cinema.",
        DOB : "April 7, 1939",

      },

    Actor: [
        {
          name: "Marlon Brando",
          DOB: "April 3, 1924",
        },
        {
          name: "Al Pacino",
          DOB: "April 25, 1940" ,
        },
      ],
    Release_date: 1972,
    Rating: 9.2,
    imageURL: "https://www.imdb.com/title/tt0068646/mediaviewer/rm746868224/?ref_=tt_ov_i",
    Featured: false,
  },

  // {

  //   "Title" : "Inception",
  //   "Description": "A thief, who enters people's dreams to steal their secrets, is given a final job where he must implant an idea into someone's mind.",
  //   "Genre":
  //     {
  //       "Name" :"Science Fiction",
  //       "Description": "Sci-Fi films combine futuristic or scientific concepts with intense action sequences, often set in space, the future, or with advanced technology.",
  //     },


  //   "Director":
  //     {
  //       "Name": "Christopher Nolan",
  //       "bio" : "Christopher Nolan is a British-American film director, producer, and screenwriter known for his work on films such as 'Inception', 'The Dark Knight Trilogy', 'Interstellar, and Dunkirk. Nolan is known for his innovative storytelling and contributions to the science fiction and superhero genres.",
  //       "DOB" : "July 30, 1970",

  //     },

  //   "Actor": [
  //       {
  //         "name": " Leonardo DiCaprio",
  //         "DOB": "November 11, 1974" ,
  //       },
  //       {
  //         "name": " Joseph Gordon-Levitt",
  //         "DOB": "February 17, 1981",
  //       },
  //       {
  //         "name": "Ellen Page",
  //         "DOB": "February 21, 1987" ,
  //       },

  //     ],
  //   "Release_date": 2010 ,
  //   "Rating": 8.8,
  //   "imageURL": "https://www.imdb.com/title/tt1375666/mediaviewer/rm3426651392/?ref_=tt_ov_i",
  //   "Featured": true,
  //   },

  {


    Title : "The Shawshank Redemption",
    Description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    Genre:
       {
      Name :"Drama",
      Description: "Drama films portray realistic and emotional stories focusing on the characters' personal development and life challenges.",
    },


    Director:
      {
        Name: "Frank Darabont",
        bio : "Frank Darabont is an American filmmaker, screenwriter, and director. He is renowned for his work in adapting Stephen King's stories into successful films, including 'The Shawshank Redemption' and 'The Green Mile.' Darabont is known for his skill in creating emotionally powerful and character-driven narratives.",
        DOB : "January 28, 1959",

      },

    Actor: [
        {
          name: "Tim Robbins",
          DOB: "October 16, 1958" ,
        },
        {
          name: "Morgan Freeman",
          DOB: "June 1, 1937",
        },
      ],
    Release_date: 1994 ,
    Rating: 9.3 ,
    imageURL: "https://www.imdb.com/title/tt0111161/mediaviewer/rm1690056449/?ref_=tt_ov_i",
    Featured: false,
    },

      {

    Title : "The Dark Knight",
    Description: "When the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    Genre:
      {
        Name :"Action",
        Description: "Action movies feature characters with extraordinary abilities who engage in thrilling action sequences, typically battling supervillains to save the world.",
      },

    Director:
      {
        Name: "Christopher Nolan",
        bio : "Christopher Nolan is a British-American film director, producer, and screenwriter known for his work on films such as 'Inception', 'The Dark Knight Trilogy', 'Interstellar, and Dunkirk. Nolan is known for his innovative storytelling and contributions to the science fiction and superhero genres.",
        DOB : "July 30, 1970",
      },

    Actor: [
        {
          name: "Christian Bale",
          DOB: "January 30, 1974",
        },
        {
          name: "Heath Ledger",
          DOB: "April 4, 1979",
          Death: "January 22, 2008"
        },
      ],
    Release_date: 2008 ,
    Rating: 9.0 ,
    imageURL: "https://www.imdb.com/title/tt0468569/mediaviewer/rm4023877632/?ref_=tt_ov_i/",
    Featured: true,
    },

    {   
    Title : "Forrest Gump",
    Description: "Through three decades of U.S. history, a man with a low IQ witnesses and unwittingly influences several defining historical events in the 20th century United States.",
    Genre:

      {
        Name :"Romance",
        Description: "Romance films incorporate song and dance numbers to tell romantic stories, where music and choreography play a significant role in the narrative",
      },

    Director:
      {
        Name: "Robert Zemeckis",
        bio : "Robert Zemeckis is an American filmmaker, screenwriter, and producer. He is famous for directing and co-writing the 'Back to the Future' trilogy, 'Forrest Gump,' 'Cast Away,' and 'Who Framed Roger Rabbit.' Zemeckis is known for his innovative use of visual effects and storytelling techniques in his films.",
        DOB : "May 14, 1951",

      },

    Actor: [
        {
          name: "Tom Hanks",
          DOB: "July 9, 1956" ,
        },
        {
          name: "Robin WrightT",
          DOB:  "April 8, 1966",
        },
      ],
    Release_date: 1994,
    Rating: 8.8,
    imageURL: "https://www.imdb.com/title/tt0109830/mediaviewer/rm1954748672/?ref_=tt_ov_i",
    Featured: false
    },

];

let users = [
  { id: 1, name: "kim", favoriteMovies: ["Forrest Gump"] },
  { id: 2, name: "joe", favoriteMovies: [] },
];



// Gets the list of data about ALL films

app.get('/movies', (req, res) => {
    res.json(movies);
})


// GET DETAILS SPECIFIC MOVIE

app.get('/movies/:title', (req,res) => {
  // const title = req.params.title;
    const { title } = req.params;  //deconstructed coding
    const movie = movies.find(movie => movie.title === title);

    if (movie) {
        res.status(201).json(movie);
    } else {
    res.status(400).send('no such movie')
    }
})   

// GET DETAILS GENRE
    
app.get('/movies/genre/:genreName', (req,res) => {
  //  const genreName = req.params;
    const { genreName } = req.params;  //deconstructed coding
    const genre = movies.find((movie) => movie.Genre.Name === genreName).Genre;

    if (genre) {
        res.status(201).json(genre);
    } else {
    res.status(400).send('no such genre')
    }
})   


// DIRECTOR

app.get('/movies/director/:directorName', (req, res)=>{
  const  {directorName} = req.params;
  const director = movies.find(movie => movie.Director.Name === directorName).Director; 

  if(director){
    res.status(200).json(director);
  }else{
    res.status(400).send('no such director');
  }
})


app.get('/users', (req, res) => {
  res.json(users);
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

 app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;
    const updatedUser = req.body;  // updated array being sent in request

    let user = users.find(user => user.id == id); // 2 == because of comparison num vs txt - trusy/falsy

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(201).send(`${movieTitle} has been added to user ${id}'s array`);
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
        res.status(201).send(`${movieTitle} has been removed from user ${id}'s array`);
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






// let movies = [
//     {
//       "title": "starwars",
//       "description": 
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//       "Genre": { "Name": "drama", "description": "dramatic" },
//       "director": {
//         "name": "Director1",
//         "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         "born": "1940",
//         "death": "",
//       },
//       "img": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Foriginalvintagemovieposters.com%2Fwp-content%2Fuploads%2F2018%2F06%2FStar-Wars-5672-768x1162.jpg&f=1&nofb=1&ipt=d191eb7a7592ede00a4efb69d08105b59832ac04e24f4d6e8eab7df59bc5537b&ipo=images",
//       "feature": "true"
//     },
//     {
//       "title": "Lion king",
//       "description":
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//       "Genre": { "Name": "Adventure", "description": "Adventurous movie" },
//       "director": {
//         "name": "Director2",
//         "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         "born": "1945",
//         "death": "",
//       },
//       "img": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Foriginalvintagemovieposters.com%2Fwp-content%2Fuploads%2F2018%2F06%2FStar-Wars-5672-768x1162.jpg&f=1&nofb=1&ipt=d191eb7a7592ede00a4efb69d08105b59832ac04e24f4d6e8eab7df59bc5537b&ipo=images",
//       "feature" : "true"
//     },
//     {
//       "title": "Stuart Little",
//       "description":
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//       "Genre": { "Name": "Adventure", "description": "Adventurous movie" },
//       "director": {
//         "name": "director2",
//         "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         "born": "1945",
//         "death": "",
//       },
//       "img": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Foriginalvintagemovieposters.com%2Fwp-content%2Fuploads%2F2018%2F06%2FStar-Wars-5672-768x1162.jpg&f=1&nofb=1&ipt=d191eb7a7592ede00a4efb69d08105b59832ac04e24f4d6e8eab7df59bc5537b&ipo=images",
//       "feature" : "true"
//     },
//     {
//       "title": "film4",
//       "description":
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//       "Genre": { "Name": "Comedy", "description": "Funny film" },
//       "director": {
//         "name": "director3",
//         "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         "born": "1940",
//         "death": "",
//       },
//       "img": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Foriginalvintagemovieposters.com%2Fwp-content%2Fuploads%2F2018%2F06%2FStar-Wars-5672-768x1162.jpg&f=1&nofb=1&ipt=d191eb7a7592ede00a4efb69d08105b59832ac04e24f4d6e8eab7df59bc5537b&ipo=images",
//       "feature" : "true"
//     },
//     {
//       "title": "film5",
//       "description":
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//       "Genre": { "Name": "Adventure", "description": "Adventurous stories" },
//       "director": {
//         "name": "director4",
//         "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         "born": "1950",
//         "death": ""
//       },
//       "img": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Foriginalvintagemovieposters.com%2Fwp-content%2Fuploads%2F2018%2F06%2FStar-Wars-5672-768x1162.jpg&f=1&nofb=1&ipt=d191eb7a7592ede00a4efb69d08105b59832ac04e24f4d6e8eab7df59bc5537b&ipo=images",
//       "feature" : "true"
//     }
    
//     ];

 

    // let genre = [
    //     { id: 1, name: "Comedy", description: "Funny Film" },
    //     { id: 2, name: "Thriller", description: "Scary film"}
    //   ];

      app.listen(8080, () => {
        console.log('Your app is listening on port 8080');
      });




      // {
      //   title: "starwars",
      //   description: 
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      //   Genre: { Name: "drama", description: "genre description here" },
      //   director: {
      //     name: "director1",
      //     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      //     born: 1940,
      //     death: "",
      //   },
      //   img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Foriginalvintagemovieposters.com%2Fwp-content%2Fuploads%2F2018%2F06%2FStar-Wars-5672-768x1162.jpg&f=1&nofb=1&ipt=d191eb7a7592ede00a4efb69d08105b59832ac04e24f4d6e8eab7df59bc5537b&ipo=images",
      //   feature: true,
      // },