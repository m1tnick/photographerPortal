const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    chalk = require("chalk"),
    Config = require(path.resolve("./configuration"));

const config = Config.getConfig();
const dbUrl = 'mongodb://' + config.HOST + ':27017/' + config.MONGODB;


// Routing
const eventsRoute = require('./routes/event.route');

// MONGOOSE DB
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

// EXPRESS
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/event', eventsRoute);

const server = app.listen(config.PORT, () => {
  console.log(
    chalk`{green Node Js server running on {green.bold ${
      config.PORT
      }} port at {green.bold ${config.MODE_TYPE}}..}`
  );
});
