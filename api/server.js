import chalk from 'chalk';
import app from './app';
import getConfig from './configuration';

const config = getConfig();
const server = app.listen(config.PORT, () => {
    console.log(
        chalk`{green Node Js server running on {green.bold ${
            config.PORT
        }} port at {green.bold ${config.MODE_TYPE}}..}`
    );
});
