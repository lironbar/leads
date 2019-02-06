const config = require('./config.json');

// define env
config.env = (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'production' ? 'prod' : 'dev');

// config override files
if (process.env.CONFIG_OVERRIDES) {
    config.configOverrides = process.env.CONFIG_OVERRIDES.split(';');
    // load config overrides
    config.configOverrides.forEach((override) => {
        console.log('loading config override', override);
        Object.assign(config, require(`./config.${override}.json`));
    });
}

module.exports = config;