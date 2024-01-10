
const express = require('express');
const app = express();
const morgan = require('morgan'),
  fs = require('fs'), // import built in node modules fs and path 
  path = require('path');


  const http = require('http');


 let topFilms = [
  {
    title: 'Sleepless in Seattle'    
  },
  {
    title: 'All about Mary'
  },
    {
    title: 'Dumbo'   
  },
  {
    title: 'You have got mail'   
  },
  {
    title: 'Space Jam'   
  },
  {
    title: 'Stuart Little'   
  },
  {
    title: 'Lion King'   
  },
  {
    title: 'Howl''s moving castle'   
  },
  {
    title: 'Spirited away'   
  },
  
];


// ADD MORGAN
// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));


// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to MyFlix film app!');
});

// Old Documentation GET request
// app.get('/documentation.html', (req, res) => {                  
//   res.sendFile('public/documentation.html', { root:  __dirname});
// });


// Movies GET request
app.get('/movies', (req, res) => {
  res.json(topFilms);
});


// Static code: just put this in and then all references to the materials in the public folder get passed thru (?) e.g. /documentation.html
app.use('/', express.static('public'));


app.get('/secreturl', (req, res) => {
  res.send('This is a secret url with super top-secret content.');
});



// ERROR HANDLING
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});




