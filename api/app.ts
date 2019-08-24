import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import eventsRoute from './routes/event.route';
import imagesRoute from './routes/image.route';
import config from './utils/config';
import chalk from 'chalk';

const app = express();
const dbUrl = 'mongodb://' + config.HOST + ':27017/' + config.MONGODB;

// MONGOOSE DB
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, { useNewUrlParser: true }).then(
    () => console.log('Database is connected'),
    err => console.log('Can not connect to the database' + err)
);

// export const morganMiddleware = morgan(function (tokens, req, res) {
//     return [
//         '\n\n\n',
//         chalk.hex('#34ace0').bold(tokens.method(req, res)),
//         chalk.hex('#ffb142').bold(tokens.status(req, res)),
//         chalk.hex('#ff5252').bold(tokens.url(req, res)),
//         chalk.hex('#2ed573').bold(tokens['response-time'](req, res) + ' ms'),
//         chalk.hex('#f78fb3').bold('@ ' + tokens.date(req, res)),
//         chalk.yellow(tokens['remote-addr'](req, res)),
//         chalk.hex('#fffa65').bold('from ' + tokens.referrer(req, res)),
//         chalk.hex('#1e90ff')(tokens['user-agent'](req, res)),
//         '\n\n\n',
//     ].join(' ');
// });

// app.use(morganMiddleware);


// EXPRESS
// app.use(morgan('dev'));
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
app.use('/images', imagesRoute);

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
