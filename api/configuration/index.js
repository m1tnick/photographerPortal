import path from 'path';

const getConfig = () => {
    return require(path.resolve(`./configuration/config.${process.env.NODE_ENV}.json`));
};

export default getConfig;
