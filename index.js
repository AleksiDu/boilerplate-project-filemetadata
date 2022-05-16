//Import Libraries
const express = require('express'); // Loads Express web framework for Node.js;
const cors = require('cors'); // CORS is a Node.js package for Express middleware that enables Cross-origin resource sharing(CORS);
const mongo = require('mongodb'); // MongoDB is a source-available cross-platform document-oriented database program;
const mongoose = require('mongoose'); // Mongoose is a JavaScript object-oriented programming library that creates a connection between MongoDB and the Express web application framework;
const multer = require('multer'); // Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files;
require('dotenv').config() // Loads environment variables from a .env files into process.env;
const app = express(); //App;

// Middleware function(s)
app.use(cors()); // Enable All CORS Requests;
app.use('/public', express.static(process.cwd() + '/public')); // CSS files in Express;

// Routes HTTP GET requests to the HTML callback functions;
app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html'); 
});

//Data Base Connection
mongoose.connect(process.env.MONGO_URI);
//Data Base Connection Check
let DatabaseConCeck = mongoose.connection; // Errors on the connection;
DatabaseConCeck.on('error', console.error.bind(console, 'Connection Error'));
DatabaseConCeck.once('open', () => {
  console.log("Connected To Data Base");
});

//#5 File Metadata Microservice;

const upload = multer({ dest: 'uploads/' }); //It accepts an options object, with dest property, which tells Multer where to upload the files.

// POST request to the URL [http://localhost:3000/api/fileanalyse]
app.post('/api/fileanalyse/', upload.single('upfile'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Upload a file');
    error.httpStatusCode = 400;
    return next(error)
  }
    res.json({
      name: file.originalname,
      type: file.mimetype,
      size: file.size
    });
});

//Prot variable declaration (For http://localhost:3000/);
const port = process.env.PORT || 3000;
// Connections on the host and port
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
