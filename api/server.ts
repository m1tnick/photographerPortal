import chalk from 'chalk';

import app from './app';
import config from './utils/config';

const server = app.listen(config.PORT, () => {
    console.log(
        'App is running at http://%s:%d in ' + chalk.bgRed(app.get('env')) + ' mode',
        config.HOST,
        config.PORT
    );
});

export default server;
