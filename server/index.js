(async () => {

    global.App = {};

    // load config
    global.App.Config = require('./app/config/config.js');

    // boot application
    await require('./app/connections/connections.js').boot();
    await require('./app/api/api.js').boot();

})();
