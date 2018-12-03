const config = require('./config.json');

// define env
config.env = (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'production' ? 'prod' : 'dev');

// load production overrides
if (config.env === 'prod') {
    console.debug('loading prodction config');
    Object.assign(config, require('./config.prod.json'));
}

module.exports = config;