// Requires
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./config/routes');
const errorHandler = require('./lib/error-handler');

//Environment
const { port, dbURI } = require('./config/environment');

//Mongoose/Mongo
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

// Initialise app
const app = express();

//Static folder
app.use(express.static(`${__dirname}/public`));

//Middleware
app.use(bodyParser.json()); // Allows other HTTP methods

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.append('Access-Control-Allow-Header', 'Content-Type');
  next();
});

app.use('/api', router); // Allows use of router

app.use(errorHandler);


app.listen(port, () => console.log(`Expess is listening to port ${port}`));



module.exports = app; // Exported to be used in tests
