const config = require('./config.json');

// define env
config.env = (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'production' ? 'prod' : 'dev');

// config override files
let configOverrides = [];
if (process.env.CONFIG_OVERRIDES) {
    configOverrides = process.env.CONFIG_OVERRIDES.split(';');
}
if (config.env === 'dev' && configOverrides.indexOf('dev') == -1) {
    configOverrides.push('dev');
}
// load config overrides
config.__overrides = [];
configOverrides.forEach((override) => {
    const filePath = `./config.${override}.json`;
    try {
        Object.assign(config, require(filePath));
        config.__overrides.push({ override, filePath });
        console.log(`loaded ${override} config file from ${filePath}`);
    } catch (err) {
        console.error(`failed to load ${override} config file from ${filePath}`);
    }
});

module.exports = config;