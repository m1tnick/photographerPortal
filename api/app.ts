import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import eventsRoute from './routes/event.route';
import config from './utils/config';

const app = express();
const dbUrl = 'mongodb://' + config.HOST + ':27017/' + config.MONGODB;

// MONGOOSE DB
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, { useNewUrlParser: true }).then(
    () => console.log('Database is connected'),
    err => console.log('Can not connect to the database' + err)
);

// EXPRESS
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});


// ROUTES
app.use('/events', eventsRoute);

app.use((req, res, next) => {
    const error: Error = new Error('Not found');
    // error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

export default app;
