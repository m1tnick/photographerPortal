import chalk from 'chalk';

import app from './app';
import config from './utils/config';

const server = app.listen(config.PORT, () => {
    console.log(
        chalk`{green Node Js server running on {green.bold ${
            config.PORT
        }} port at {green.bold ${config.HOST}}..}`
    );
});
