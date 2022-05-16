var express = require('express');
var cors = require('cors');
const mongo = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

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



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
