import * as dotenv from 'dotenv';

dotenv.config();

/*
 For some reason is not picking the correct path
 Deal with this later
*/

// let path;

// switch (process.env.NODE_ENV) {

//   case 'test':
//     path = __dirname + '../.env.test';
//     break;
//   case 'production':
//     path = __dirname + '../.env.production';
//     break;
//   default:
//     path = '.env.development';
// }

// dotenv.config({ path: path });

const config = {
    PORT: process.env.PORT,
    MONGODB: process.env.MONGODB,
    HOST: process.env.HOST
};

export default config;
